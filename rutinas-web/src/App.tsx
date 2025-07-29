
import { useState } from 'react';

export default function RutinasApp() {
  const [nivel, setNivel] = useState("principiante");
  const [objetivo, setObjetivo] = useState("ganar masa muscular");
  const [rutina, setRutina] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const obtenerRutina = async () => {
    setLoading(true);
    const url = `https://rutinas-api.vercel.app/?nivel=${nivel}&objetivo=${encodeURIComponent(objetivo)}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setRutina(data.rutina);
    } catch (error) {
      setRutina(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Rutinas de Ejercicio en Casa</h1>
      <div className="flex gap-4 mb-4">
        <select value={nivel} onChange={e => setNivel(e.target.value)} className="p-2 rounded">
          <option value="principiante">Principiante</option>
        </select>
        <select value={objetivo} onChange={e => setObjetivo(e.target.value)} className="p-2 rounded">
          <option value="ganar masa muscular">Ganar masa muscular</option>
          <option value="tonificar">Tonificar</option>
          <option value="perder grasa">Perder grasa</option>
        </select>
        <button
          onClick={obtenerRutina}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Cargando...' : 'Obtener Rutina'}
        </button>
      </div>
      {rutina && (
        <div className="grid gap-4 w-full max-w-md">
          {rutina.map((ejercicio, index) => (
            <div key={index} className="bg-white shadow rounded p-4 text-center">
              {ejercicio}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
