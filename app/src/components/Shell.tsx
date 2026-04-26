import { type ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ModuleHeader } from '@primal/shared-ui';
import '@primal/shared-ui/src/ModuleHeader.css';
import { supabase } from '../lib/supabase';
import { useSeatStore } from '../stores/seatStore';
import SeatBadge from './SeatBadge';

const NAV_ITEMS = [
  { num: '01', label: 'BROWSE', disabled: true, path: null },
  { num: '02', label: 'ACTIVITY', disabled: true, path: null },
  { num: '03', label: 'SETTINGS', disabled: false, path: '/settings' },
];

export default function Shell({ children }: { children: ReactNode }) {
  const me = useSeatStore((s) => s.me);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!me) return;
    const beat = () => {
      if (document.visibilityState !== 'visible') return;
      void supabase.from('devices')
        .update({ last_seen_at: new Date().toISOString() })
        .eq('id', me.id);
    };
    beat();
    const id = setInterval(beat, 30_000);
    return () => clearInterval(id);
  }, [me]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <ModuleHeader title="STUDIO">
        <SeatBadge />
      </ModuleHeader>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-[200px] flex-shrink-0 border-r border-[var(--primal-hair)] flex flex-col">
          <div className="flex-1 py-4">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.num}
                onClick={() => {
                  if (!item.disabled && item.path) navigate(item.path);
                }}
                className={`px-4 py-2.5 flex items-center gap-3 text-[9px] tracking-[0.22em] uppercase ${
                  item.disabled
                    ? 'text-[var(--primal-dim)] cursor-not-allowed'
                    : `cursor-pointer hover:bg-white/[0.02] ${
                        location.pathname === item.path ? 'text-white' : 'text-[var(--primal-dim)]'
                      }`
                }`}
              >
                <span className="text-[var(--primal-dim)]">{item.num}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
