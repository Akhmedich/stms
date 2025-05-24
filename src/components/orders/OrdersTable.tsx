'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabaseClient'

export default function OrdersTable({ onRowClick }: { onRowClick: (order: any) => void }) {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    supabase.from('orders').select('*').then(({ data }) => {
      setOrders(data ?? [])
    })
  }, [])

  return (
    <table className="w-full text-sm border">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left p-2">Order ID</th>
          <th className="text-left p-2">Customer</th>
          <th className="text-left p-2">Status</th>
          <th className="text-left p-2">Pickup Date</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr
            key={order.order_id}
            className="hover:bg-gray-50 cursor-pointer"
            onClick={() => onRowClick(order)}
          >
            <td className="p-2">{order.order_id}</td>
            <td className="p-2">{order.customer || order.customer_id}</td>
            <td className="p-2">{order.status}</td>
            <td className="p-2">{order.pickup_time ? order.pickup_time.split('T')[0] : ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
