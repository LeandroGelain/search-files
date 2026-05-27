import { useEffect, useState } from 'react';

function App() {
  const [status, setStatus] = useState('Carregando...');

  useEffect(() => {
    fetch('http://localhost:3000/api/status')
      .then((res) => res.json())
      .then((data) => setStatus(JSON.stringify(data, null, 2)))
      .catch(() => setStatus('Não foi possível conectar ao backend'));
  }, []);

  return (
    <div className="app">
      <h1>NestJS + React</h1>
      <pre>{status}</pre>
    </div>
  );
}

export default App;
