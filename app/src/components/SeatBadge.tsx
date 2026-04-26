import { useNavigate } from 'react-router-dom';
import { useSeatStore } from '../stores/seatStore';

export default function SeatBadge() {
  const me = useSeatStore((s) => s.me);
  const navigate = useNavigate();

  if (!me) return null;

  return (
    <button
      onClick={() => navigate('/settings')}
      className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/[0.04] rounded transition-colors"
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: me.color }}
      />
      <span className="text-[9px] tracking-[0.2em] uppercase text-white">
        {me.name}
      </span>
    </button>
  );
}
