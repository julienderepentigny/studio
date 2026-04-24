import type { ReactNode } from 'react';

const NAV_ITEMS = [
  { num: '01', label: 'BROWSE', disabled: true },
  { num: '02', label: 'ACTIVITY', disabled: true },
  { num: '03', label: 'SETTINGS', disabled: true },
];

export default function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <nav className="w-[200px] flex-shrink-0 border-r border-[var(--primal-hair)] flex flex-col">
        <div className="px-4 py-5 border-b border-[var(--primal-hair)]">
          <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-white"
                style={{ textShadow: '0 0 6px rgba(255,255,255,0.18)' }}>
            PRIMAL // STUDIO
          </span>
        </div>
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
  );
}
