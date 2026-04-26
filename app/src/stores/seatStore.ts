import { create } from 'zustand';
import type { Database } from '../types/db';

export type Device = Database['public']['Tables']['devices']['Row'];

type SeatState = {
  me: Device | null;
  setMe: (d: Device) => void;
  clear: () => void;
};

export const useSeatStore = create<SeatState>((set) => ({
  me: null,
  setMe: (d) => set({ me: d }),
  clear: () => set({ me: null }),
}));
