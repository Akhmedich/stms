'use client'
import { Drawer } from '@/components/ui/drawer'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import DetailsTab from './tabs/DetailsTab'
import { useState } from 'react'

export default function OrderDrawer({ open, onClose, order, onSaved }: { open: boolean; onClose: () => void; order?: any; onSaved: () => void }) {
  const [tab, setTab] = useState('details')
  return (
    <Drawer open={open} onOpenChange={v => !v && onClose()}>
  <div className="p-4 border-b">
    <h2 className="text-lg font-semibold">Order Details</h2>
  </div>
      <Tabs defaultValue="details" value={tab} onValueChange={setTab} className="w-full">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <DetailsTab order={order} onSave={onSaved} />
        </TabsContent>
        <TabsContent value="map">Map and route info</TabsContent>
        <TabsContent value="tasks">Stop/Task editor</TabsContent>
        <TabsContent value="documents">POD/BOL uploads</TabsContent>
        <TabsContent value="financials">Invoice/quote details</TabsContent>
      </Tabs>
    </Drawer>
  )
}
