import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase';
import './App.css'

export default function App() {
  const [ok, setOk] = useState<'...' | '✅' | '❌'>('...');

  useEffect(() => {
    supabase.from('Clubs').select('*').limit(1)
      .then(res => setOk(res.error ? '❌' : '✅'));
  }, []);

  return <div className="p-6 text-xl">Supabase connection: {ok}</div>;
}