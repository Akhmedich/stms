"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

interface TripDetailsDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function TripDetailsDrawer({ open, onClose }: TripDetailsDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={(v) => !v && onClose()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold">Trip Details</DrawerTitle>
        </DrawerHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-muted-foreground">General</h3>
                <p>Status: Booked</p>
                <p>Trip ID: TRIP1234</p>
                <p>REF No: 458934</p>
              </div>
              <div>
                <h3 className="font-semibold text-muted-foreground">Reefer</h3>
                <p>Type: Frozen</p>
                <p>Temp: -18°C</p>
              </div>
              <div>
                <h3 className="font-semibold text-muted-foreground">Pickup & Delivery</h3>
                <p>First Pickup: Phoenix, AZ</p>
                <p>Last Delivery: Brooklyn, NY</p>
              </div>
              <div>
                <h3 className="font-semibold text-muted-foreground">Financial</h3>
                <p>Quote: $4200</p>
                <p>Invoice ID: INV-001</p>
              </div>
              <div>
                <h3 className="font-semibold text-muted-foreground">Commodities</h3>
                <p>Weight: 18,000 lbs</p>
                <p>Quantity: 22 pallets</p>
              </div>
              <div>
                <h3 className="font-semibold text-muted-foreground">Notes</h3>
                <p>Call consignee 1 hour before arrival.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="map">
            <div className="text-sm text-muted-foreground">[Map placeholder]</div>
          </TabsContent>

          <TabsContent value="financials">
            <div className="text-sm text-muted-foreground">[Financials placeholder]</div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="text-sm text-muted-foreground">[Documents placeholder]</div>
          </TabsContent>

          <TabsContent value="tasks">
            <div className="text-sm text-muted-foreground">[Tasks placeholder]</div>
          </TabsContent>
        </Tabs>
      </DrawerContent>
    </Drawer>
  );
}
