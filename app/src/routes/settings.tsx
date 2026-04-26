import { Navigate, useNavigate } from 'react-router-dom';
import { useSeatStore } from '../stores/seatStore';

export default function Settings() {
  const me = useSeatStore((s) => s.me);
  const clear = useSeatStore((s) => s.clear);
  const navigate = useNavigate();

  if (!me) return <Navigate to="/seat" replace />;

  const handleSignOut = () => {
    localStorage.removeItem('studio.seat_slug');
    clear();
    navigate('/seat', { replace: true });
  };

  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-8">
        <h1 className="text-[13px] font-medium tracking-[0.18em] uppercase text-white text-center">
          SETTINGS
        </h1>

        <div className="space-y-4 border border-[var(--primal-hair)] rounded p-4">
          <div className="flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: me.color }}
            />
            <span className="text-[11px] tracking-[0.14em] uppercase text-white">
              {me.name}
            </span>
          </div>

          <div className="text-[9px] tracking-[0.2em] uppercase text-[var(--primal-dim)] space-y-1">
            <p>SLUG: {me.slug}</p>
            <p>CREATED: {new Date(me.created_at).toLocaleDateString()}</p>
            {me.last_seen_at && (
              <p>LAST SEEN: {new Date(me.last_seen_at).toLocaleString()}</p>
            )}
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded text-[10px] tracking-[0.18em] uppercase text-red-400 transition-colors"
        >
          SIGN OUT THIS SEAT
        </button>
      </div>
    </div>
  );
}
