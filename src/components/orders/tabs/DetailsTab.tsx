'use client'
import { useState } from 'react'
import { supabase } from '@/utils/supabaseClient'

export default function DetailsTab({ order, onSave }: { order?: any; onSave: () => void }) {
  const [customer, setCustomer] = useState(order?.customer || '')
  const [pickupDate, setPickupDate] = useState(order?.pickup_time ? order.pickup_time.split('T')[0] : '')
  const [status, setStatus] = useState(order?.status || 'New')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: any) {
    e.preventDefault()
    setSaving(true)
    const data = {
      customer,
      pickup_time: pickupDate,
      status,
    }
    if (order?.order_id) {
      // Update
      await supabase.from('orders').update(data).eq('order_id', order.order_id)
    } else {
      // Insert
      await supabase.from('orders').insert([data])
    }
    setSaving(false)
    onSave()
  }

  return (
    <form className="space-y-4 p-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium">Customer</label>
        <input
          className="border p-2 w-full rounded"
          placeholder="Customer name"
          value={customer}
          onChange={e => setCustomer(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Pickup Date</label>
        <input
          type="date"
          className="border p-2 w-full rounded"
          value={pickupDate}
          onChange={e => setPickupDate(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Status</label>
        <select
          className="border p-2 w-full rounded"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option>New</option>
          <option>Booked</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save Order'}
      </button>
    </form>
  )
}
