import React, { useEffect, useState } from "react";

function ListadoUser() {
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

  return (
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 relative overflow-x-auto h-screen bg-[url(/src/assets/campus1.png)]">
      <table className="min-w-full text-sm text-center ">
        <tbody>
          <tr>
            <th scope="col" className="px-6 py-3">
              Fecha
            </th>
            <th scope="col" className="px-6 py-3">
              Espacio deportivo
            </th>
            <th scope="col" className="px-6 py-3">
              Horario
            </th>
            <th scope="col" className="px-6 py-3">
              Accion
            </th>

          </tr>
          {list?.length > 0 &&
            list?.map(item => (
              <tr key={item.id} className="dark:bg-cyan-200 dark:bg-opacity-30 ">
                <td className="px-6 py-4 dark:text-white border-b font-medium dark:border-neutral-500">{item.fecha}</td>
                <td className="px-6 py-4 dark:text-white border-b font-medium dark:border-neutral-500">{item.espacio_deportivo}</td>
                <td className="px-6 py-4 dark:text-white border-b font-medium dark:border-neutral-500">{item.horario}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListadoUser;
