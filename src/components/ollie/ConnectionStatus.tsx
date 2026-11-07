import { useEffect, useState } from 'react';
export function ConnectionStatus() {
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update(); window.addEventListener('offline', update); window.addEventListener('online', update);
    return () => { window.removeEventListener('offline', update); window.removeEventListener('online', update); };
  }, []);
  return offline ? <div role="status" className="fixed inset-x-0 bottom-0 z-50 bg-card px-5 py-3 text-center text-support text-foreground shadow-sheet">Ollie is offline. Saved learning stays here; new answers need an internet connection.</div> : null;
}