// app/trips/page.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TripsDashboard() {
  // Моковые данные — заменишь на fetch из Supabase позже
  const trips = [
    {
      trip_id: 101,
      direction: "WEST",
      origin: "Somerset, NJ",
      terminal: "Sacramento, CA",
      start_datetime: "2024-05-19 11:00",
      status: "Planned",
      truck: "T123",
      trailer: "TR567",
      drivers: ["John Doe", "Mike Smith"],
    },
    // ...ещё трипы
  ];

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Trips Dashboard</h1>
      <div className="grid gap-4">
        {trips.map((trip) => (
          <Card key={trip.trip_id} className="rounded-2xl shadow p-4">
            <CardContent>
              <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
                <div>
                  <div className="text-xl font-semibold">Trip #{trip.trip_id}</div>
                  <div className="text-sm text-gray-500">{trip.origin} → {trip.terminal} ({trip.direction})</div>
                  <div className="text-xs text-gray-400">Start: {trip.start_datetime}</div>
                  <div className="mt-1 text-sm">Truck: <b>{trip.truck}</b>, Trailer: <b>{trip.trailer}</b></div>
                  <div className="text-xs text-gray-500">Drivers: {trip.drivers.join(", ")}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">{trip.status}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View</Button>
                    <Button size="sm" variant="secondary">Edit</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
