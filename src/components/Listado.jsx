import React, { useEffect, useState } from "react";

function Listado() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const url = 'https://api-v3-espaciosucm.onrender.com/api/v3/login/user/mis-reservas/';
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('access'),
      },
    })
      .then(response => response.json())
      .then(json => setList(json));
  }

  console.log('lol', list)
  return (
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 relative overflow-x-auto h-screen bg-[url(/src/assets/campus1.png)]">
      <table className="min-w-full text-sm text-center ">
        <tbody>
          <tr>
            <th scope="col" className="px-6 py-3">
              UserID
            </th>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              Accion
            </th>
          </tr>
          {list?.length > 0 &&
            list?.map(item => (
              <tr key={item.id} className="dark:bg-cyan-200 dark:bg-opacity-30 ">
                <td className="px-6 py-4 dark:text-black border-b font-medium dark:border-neutral-500">{item.id}</td>
                <td className="px-6 py-4 dark:text-black border-b font-medium dark:border-neutral-500">{item.equipo_descripcion}</td>
                <td className="px-6 py-4 dark:text-black border-b font-medium dark:border-neutral-500">{item.espacio_reserva}</td>
                <td className="px-6 py-4 dark:text-black border-b font-medium dark:border-neutral-500">{item.fecha_reserva}</td>
                <td className="px-6 py-4 dark:text-black border-b font-medium dark:border-neutral-500">{item.horario_reserva}</td>
                <td className="px-6 py-4 dark:text-black border-b font-medium dark:border-neutral-500">{item.reserva_activa}</td>
                <td className="px-6 py-4 dark:text-black border-b font-medium dark:border-neutral-500">{item.solicita_equipo}</td>
                <td className="px-3 py-2">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 md:mt-0 ml-0 md:ml-2 focus-shadow-outline">X</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Listado;
