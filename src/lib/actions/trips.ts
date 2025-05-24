// src/lib/actions/trips.ts
'use server';

import { z } from "zod";

// Клиент для работы с Supabase — путь может отличаться!
import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

// !!! Скопируй tripSchema из формы или импортируй, если вынесешь в отдельный файл
const stopSchema = z.object({
  location: z.string().min(2, 'Location required'),
  state: z.string().length(2, '2-letter state'),
  appointment: z.date().optional(),
});
const tripSchema = z.object({
  origin: z.string().min(2),
  direction: z.enum(['EAST', 'WEST']),
  startDateTime: z.date(),
  temperatureMode: z.enum(['55F_START_STOP', '35F_CONTINUOUS']),
  stops: z.array(stopSchema).min(1, 'At least one stop'),
});

function getShort(location: string): string {
  return location.trim().split(/\s+/).pop()?.toUpperCase().slice(0, 3) ?? '';
}

async function resolveCycleId(origin: string, direction: 'EAST' | 'WEST', supabase: ReturnType<typeof createClient>) {
  const short = getShort(origin);
  const startNew = short === 'NJ' || short === 'NJS';
  if (startNew) {
    const { data, error } = await supabase
      .from('cycles')
      .insert({ direction, start_datetime: new Date().toISOString() })
      .select('cycle_id')
      .single();
    if (error) throw error;
    return data!.cycle_id as number;
  }
  const { data: existing } = await supabase
    .from('cycles')
    .select('cycle_id')
    .eq('direction', direction)
    .eq('status', 'ACTIVE')
    .order('last_trip_end_datetime', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (existing) return existing.cycle_id;
  const { data: fallback } = await supabase
    .from('cycles')
    .insert({ direction, start_datetime: new Date().toISOString() })
    .select('cycle_id')
    .single();
  return fallback!.cycle_id as number;
}

export async function createTrip(payload: z.infer<typeof tripSchema>) {
  const supabase = createClient();
  const cycleId = await resolveCycleId(payload.origin, payload.direction, supabase);

  const { data: tripRes, error: tripErr } = await supabase
    .from('trips')
    .insert({
      origin: payload.origin,
      direction: payload.direction,
      start_datetime: payload.startDateTime.toISOString(),
      temperature_mode: payload.temperatureMode,
      cycle_id: cycleId,
    })
    .select('trip_id')
    .single();
  if (tripErr) return false;
  const tripId = tripRes!.trip_id;

  const stopRows = payload.stops.map((s, idx) => ({
    trip_id: tripId,
    stop_order: idx + 1,
    location: s.location,
    state: s.state,
    appointment: s.appointment ? s.appointment.toISOString() : null,
  }));
  const { error: stopErr } = await supabase.from('stops').insert(stopRows);
  if (stopErr) return false;

  revalidatePath('/trips');
  return true;
}
