// src/components/trips/AddTripForm.tsx
'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { createTrip } from '@/lib/actions/trips';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

// ------------ SCHEMA ------------
const stopSchema = z.object({
  location: z.string().min(2),
  state: z.string().length(2),
  appointment: z.date().optional(),
});
export const tripSchema = z.object({
  origin: z.string().min(2),
  direction: z.enum(['EAST', 'WEST']),
  startDateTime: z.date(),
  temperatureMode: z.enum(['55F_START_STOP', '35F_CONTINUOUS']),
  stops: z.array(stopSchema).min(1),
});

// ------------ COMPONENT ------------
export default function AddTripForm() {
  const router = useRouter();
  const [pending, start] = useTransition();

  const [form, setForm] = useState({
    direction: '' as '' | 'WEST' | 'EAST',
    origin: '',
    startDateTime: new Date(),
    temperatureMode: '' as '' | '55F_START_STOP' | '35F_CONTINUOUS',
  });

  const [stops, setStops] = useState<z.infer<typeof stopSchema>[]>([]);

  // ---- side‑effect: prefill Origin & Temp when Direction chosen ----
  useEffect(() => {
    if (form.direction === 'WEST') {
      setForm((f) => ({
        ...f,
        origin: f.origin || 'NJS',
        temperatureMode: '55F_START_STOP',
      }));
    }
    if (form.direction === 'EAST') {
      // Origin определяется после выбора Cycle → пока пусто.
      setForm((f) => ({ ...f, temperatureMode: '35F_CONTINUOUS' }));
    }
  }, [form.direction]);

  // ---- stop helpers ----
  const handleStopChange = (i: number, k: keyof z.infer<typeof stopSchema>, v: any) =>
    setStops((prev) => prev.map((s, idx) => (i === idx ? { ...s, [k]: v } : s)));
  const addStop = () => setStops((p) => [...p, { location: '', state: '', appointment: undefined }]);
  const removeStop = (i: number) => setStops((p) => p.filter((_, idx) => idx !== i));

  // ---- submit ----
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = tripSchema.safeParse({ ...form, stops });
    if (!parsed.success) {
      alert(parsed.error.issues.map((x) => x.message).join('\n'));
      return;
    }
    start(async () => {
      const ok = await createTrip(parsed.data);
      if (ok) router.push('/trips');
    });
  };

  // ---- UI ----
  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-xl">
      {/* Direction first */}
      <div>
        <Label className="">Direction</Label>
        <Select
          value={form.direction}
          onValueChange={(v) => setForm({ ...form, direction: v as 'EAST' | 'WEST' })}
        >
          <SelectTrigger className=""><SelectValue placeholder="Select" /></SelectTrigger>
          <SelectContent className="">
            <SelectItem value="WEST" className="">WEST</SelectItem>
            <SelectItem value="EAST" className="">EAST</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Origin auto‑prefilled for WEST, editable */}
      {form.direction && (
        <div>
          <Label htmlFor="origin" className="">Origin</Label>
          <Input
            id="origin"
            value={form.origin}
            onChange={(e) => setForm({ ...form, origin: e.target.value })}
            required
            type="text"
            className=""
          />
        </div>
      )}

      {/* Start date */}
      <div>
        <Label className="">Start Date & Time</Label>
        <Calendar
          mode="single"
          selected={form.startDateTime}
          onSelect={(d) => d && setForm({ ...form, startDateTime: d })}
          className="border rounded-md"
          footer={<div className="text-xs px-2 py-1 text-muted-foreground">{format(form.startDateTime, 'PPPp')}</div>}
          classNames={{}}
        />
      </div>

      {/* Temperature auto‑defaulted */}
      {form.direction && (
        <div>
          <Label className="">Temperature</Label>
          <Select
            value={form.temperatureMode}
            onValueChange={(v) => setForm({ ...form, temperatureMode: v as any })}
          >
            <SelectTrigger className=""><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent className="">
              <SelectItem value="55F_START_STOP" className="">55°F Start/Stop</SelectItem>
              <SelectItem value="35F_CONTINUOUS" className="">35°F Continuous</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Stops */}
      {form.direction === 'EAST' && (
        <div className="space-y-4">
          <Label className="text-lg">Stops</Label>
          {stops.map((s, i) => (
            <div key={i} className="grid grid-cols-5 gap-2 items-end">
              <Input
                placeholder="Location"
                value={s.location}
                onChange={(e) => handleStopChange(i, 'location', e.target.value)}
                className="col-span-2"
                type="text"
              />
              <Input
                placeholder="ST"
                maxLength={2}
                value={s.state}
                onChange={(e) => handleStopChange(i, 'state', e.target.value.toUpperCase())}
                className=""
                type="text"
              />
              <Calendar
                mode="single"
                selected={s.appointment}
                onSelect={(d) => handleStopChange(i, 'appointment', d!)}
                className="border rounded-md col-span-1 max-w-[230px]"
                classNames={{}}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className=""
                onClick={() => removeStop(i)}
                disabled={stops.length === 1}
              >
                <Trash2Icon className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            size="default"
            onClick={addStop}
            className="flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />Add Stop
          </Button>
        </div>
      )}

      {/* Submit */}
      {form.direction && (
        <Button
          type="submit"
          disabled={pending}
          className="w-full"
          variant="default"
          size="default"
        >
          {pending ? 'Saving…' : 'Create Trip'}
        </Button>
      )}
    </form>
  );
}
