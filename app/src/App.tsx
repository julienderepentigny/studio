import { Routes, Route } from 'react-router-dom';
import Shell from './components/Shell';
import Index from './routes/index';

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="*" element={<Index />} />
      </Routes>
    </Shell>
  );
}
