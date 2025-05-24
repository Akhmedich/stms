import { create } from 'zustand'

type FilterState = {
  status: 'ALL' | 'Planned' | 'InTransit' | 'Delayed'
  setStatus: (v: FilterState['status']) => void
}

export const useTripsFilter = create<FilterState>(set => ({
  status: 'ALL',
  setStatus: v => set({ status: v }),
}))
