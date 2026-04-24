import { env } from '../lib/env';

export default function Index() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-[15px] font-medium tracking-[0.14em] uppercase text-white"
            style={{ textShadow: '0 0 6px rgba(255,255,255,0.18)' }}>
          PRIMAL // STUDIO
        </h1>
        <p className="text-[10px] tracking-[0.22em] uppercase text-[var(--primal-dim)]">
          PHASE 0 SCAFFOLD
        </p>
        <p className="text-[9px] tracking-[0.2em] uppercase text-[var(--primal-dim)]">
          BUILD {env.buildHash}
        </p>
      </div>
    </div>
  );
}
