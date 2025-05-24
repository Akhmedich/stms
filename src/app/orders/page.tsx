'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import OrdersTable from '@/components/orders/OrdersTable'
import OrderDrawer from '@/components/orders/OrderDrawer'

export default function OrdersPage() {
  const [open, setOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [refresh, setRefresh] = useState(false)

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Orders</h1>
        <Button
          className=""
          variant="default"
          size="default"
          onClick={() => { setSelectedOrder(null); setOpen(true); }}
        >
          New Order
        </Button>
      </div>
      <OrdersTable
        onRowClick={order => { setSelectedOrder(order); setOpen(true); }}
        key={refresh ? 'refresh' : 'norefresh'}
      />
      <OrderDrawer
        open={open}
        onClose={() => setOpen(false)}
        order={selectedOrder}
        onSaved={() => { setOpen(false); setRefresh(r => !r); }}
      />
    </div>
  )
}
