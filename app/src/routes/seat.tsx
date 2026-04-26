import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useSeatStore, type Device } from '../stores/seatStore';

const COLORS = ['#ffffff', '#ff4444', '#ffaa00', '#44ff88', '#44aaff', '#ff44aa'];

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const suffix = () => Math.random().toString(36).slice(2, 5);

export default function Seat() {
  const me = useSeatStore((s) => s.me);
  const setMe = useSeatStore((s) => s.setMe);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const slug = localStorage.getItem('studio.seat_slug');
    if (slug) {
      supabase
        .from('devices')
        .select('*')
        .eq('slug', slug)
        .limit(1)
        .single()
        .then(({ data }) => {
          if (data) {
            setMe(data);
          } else {
            localStorage.removeItem('studio.seat_slug');
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [setMe]);

  useEffect(() => {
    if (!loading && !me) {
      supabase
        .from('devices')
        .select('*')
        .order('created_at', { ascending: true })
        .then(({ data }) => {
          if (data) setDevices(data);
        });
    }
  }, [loading, me]);

  if (loading) return null;
  if (me) return <Navigate to="/" replace />;

  const handlePickSeat = (device: Device) => {
    localStorage.setItem('studio.seat_slug', device.slug);
    setMe(device);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const trimmed = name.trim();
    if (trimmed.length < 2 || trimmed.length > 40) {
      setError('Name must be 2–40 characters.');
      return;
    }
    setSubmitting(true);
    const slug = slugify(trimmed) + '-' + suffix();
    const { data, error: dbError } = await supabase
      .from('devices')
      .insert({ name: trimmed, color, slug })
      .select()
      .single();

    if (dbError || !data) {
      setError(dbError?.message ?? 'Failed to create seat.');
      setSubmitting(false);
      return;
    }
    localStorage.setItem('studio.seat_slug', data.slug);
    setMe(data);
  };

  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-[13px] font-medium tracking-[0.18em] uppercase text-white text-center">
          SELECT SEAT
        </h1>

        <div className="grid grid-cols-2 gap-3">
          {devices.map((d) => (
            <button
              key={d.id}
              onClick={() => handlePickSeat(d)}
              className="flex items-center gap-3 px-4 py-3 border border-[var(--primal-hair)] rounded hover:bg-white/[0.04] transition-colors text-left"
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: d.color }}
              />
              <span className="text-[10px] tracking-[0.18em] uppercase text-white truncate">
                {d.name}
              </span>
            </button>
          ))}

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-[var(--primal-hair)] rounded hover:bg-white/[0.04] transition-colors"
          >
            <span className="text-[10px] tracking-[0.18em] uppercase text-[var(--primal-dim)]">
              + NEW SEAT
            </span>
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreate} className="space-y-4 border border-[var(--primal-hair)] rounded p-4">
            <div>
              <label className="block text-[9px] tracking-[0.2em] uppercase text-[var(--primal-dim)] mb-2">
                SEAT NAME
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={40}
                  autoFocus
                  className="w-full bg-transparent border border-[var(--primal-hair)] rounded px-3 py-2 text-[11px] text-white tracking-[0.1em] outline-none focus:border-white/30 transition-colors"
                  placeholder="e.g. Front Desk"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] text-[var(--primal-dim)]">
                  {name.length}/40
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[9px] tracking-[0.2em] uppercase text-[var(--primal-dim)] mb-2">
                COLOR
              </label>
              <div className="flex gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-7 h-7 rounded-full border-2 transition-colors ${
                      color === c ? 'border-white' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {error && (
              <p className="text-[10px] text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-white/[0.08] hover:bg-white/[0.12] border border-[var(--primal-hair)] rounded text-[10px] tracking-[0.18em] uppercase text-white transition-colors disabled:opacity-50"
            >
              {submitting ? 'CREATING...' : 'CREATE SEAT'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
