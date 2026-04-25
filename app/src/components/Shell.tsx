import type { ReactNode } from 'react';
import { ModuleHeader } from '@primal/shared-ui';
import '@primal/shared-ui/src/ModuleHeader.css';

const NAV_ITEMS = [
  { num: '01', label: 'BROWSE', disabled: true },
  { num: '02', label: 'ACTIVITY', disabled: true },
  { num: '03', label: 'SETTINGS', disabled: true },
];

export default function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <ModuleHeader title="STUDIO" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-[200px] flex-shrink-0 border-r border-[var(--primal-hair)] flex flex-col">
          <div className="flex-1 py-4">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.num}
                className={`px-4 py-2.5 flex items-center gap-3 text-[9px] tracking-[0.22em] uppercase ${
                  item.disabled
                    ? 'text-[var(--primal-dim)] cursor-not-allowed'
                    : 'text-white cursor-pointer hover:bg-white/[0.02]'
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
