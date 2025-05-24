import { createColumnHelper } from '@tanstack/react-table'
import type { TripRow } from '@/lib/queries'

const c = createColumnHelper<TripRow>()

export const columns = [
  c.accessor('trip_id',   { header: 'Trip' }),
  c.accessor('start',     { header: 'Start ⏰' }),
  c.accessor('origin',    { header: 'Origin' }),
  c.accessor('direction', { header: 'Direction' }),
  c.accessor('ez_number', { header: 'EZ#' }),
  c.accessor('status',    { header: 'Status' }),
]
