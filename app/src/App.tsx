import { Routes, Route } from 'react-router-dom';
import Shell from './components/Shell';
import Index from './routes/index';
import Seat from './routes/seat';
import Settings from './routes/settings';

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/seat" element={<Seat />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Shell>
  );
}
