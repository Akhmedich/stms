'use client';
import { useState } from 'react';
import TripDrawer from '@/components/trips/TripDrawer';
import { Button } from '@/components/ui/button';

export default function OrdersPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Orders</h1>
        <Button
  onClick={() => setDrawerOpen(true)}
  variant="default"
  size="sm"
  className="px-4"
>
  + Create
</Button>

      </div>

      {/* Тут будет твоя таблица Orders или Trips */}

      <TripDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
