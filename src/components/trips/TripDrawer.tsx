// src/components/trips/TripDrawer.tsx
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud, ArrowRight, ArrowLeft, Plus, Trash2, RefreshCcw, Users } from "lucide-react";

export default function TripDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [stops, setStops] = useState<{ location: string; state: string }[]>([]);
  const [unit, setUnit] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setStep(1); // simulate parsing success
    }
  };

  const addStop = () => setStops((s) => [...s, { location: "", state: "" }]);
  const updateStop = (i: number, key: "location" | "state", value: string) => {
    setStops((s) => s.map((stop, idx) => (i === idx ? { ...stop, [key]: value } : stop)));
  };
  const removeStop = (i: number) => {
    setStops((s) => s.filter((_, idx) => idx !== i));
  };

  return (
    <Drawer open={open} onOpenChange={(v) => !v && onClose()}>
      <DrawerContent className="w-full max-w-xl ml-auto border-l border-gray-200 shadow-xl">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold">Create Trip / Load</DrawerTitle>
        </DrawerHeader>

        {step === 0 && (
          <div className="p-4 space-y-4">
            <Label className="text-sm font-medium">Upload Load Sheet or Rate Con</Label>
            <Input
              type="file"
              accept=".pdf,.csv,.xlsx"
              onChange={handleUpload}
              className="cursor-pointer border-dashed border-2 border-blue-500 hover:border-blue-600"
            />
            <p className="text-xs text-muted-foreground">Accepted formats: PDF, Excel, CSV</p>
          </div>
        )}

        {step === 1 && (
          <div className="p-4 space-y-6">
            <div className="bg-muted rounded-md p-3 text-sm">File: {file?.name}</div>
            <div>
              <Label className="">Origin</Label>
              <Input placeholder="Auto-filled from parser..." defaultValue="Chino, CA" className="" type="text" />
            </div>
            <div>
              <Label className="">Direction</Label>
              <Input placeholder="WEST / EAST" defaultValue="EAST" className="" type="text" />
            </div>
            <div>
              <Label className="">Temperature Mode</Label>
              <Input placeholder="35F_CONTINUOUS" defaultValue="35F_CONTINUOUS" className="" type="text" />
            </div>

            <Button
              onClick={() => setStep(2)}
              className="w-full flex gap-2"
              variant="default"
              size="sm"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-semibold">Stops</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setStep(1)} className="gap-1">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button variant="outline" size="sm" onClick={() => alert("Optimize called")} className="gap-1">
                  <RefreshCcw className="w-4 h-4" /> Optimize
                </Button>
                <Button variant="outline" size="sm" onClick={addStop} className="gap-1">
                  <Plus className="w-4 h-4" /> Add Stop
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              {stops.map((stop, i) => (
                <div key={i} className="grid grid-cols-6 gap-2 items-end">
                  <Input
                    placeholder="Location"
                    value={stop.location}
                    onChange={(e) => updateStop(i, "location", e.target.value)}
                    className="col-span-3"
                    type="text"
                  />
                  <Input
                    placeholder="ST"
                    maxLength={2}
                    value={stop.state}
                    onChange={(e) => updateStop(i, "state", e.target.value.toUpperCase())}
                    className="col-span-2"
                    type="text"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-500"
                    onClick={() => removeStop(i)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t">
              <Label className="mb-2 block">Assign Unit (Team + Equipment)</Label>
              <Input
                placeholder="Select or auto-suggest Unit ID"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className=""
                type="text"
              />
              <div className="pt-4">
                <Button variant="default" size="sm" className="w-full" onClick={() => alert("Trip Created")}>Confirm & Create</Button>
              </div>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
