import React, { useEffect, useState } from "react";

function Listado() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const url = 'https://api-v3-espaciosucm.onrender.com/api/v3/login/user/details/';
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
      <table className="min-w-full text-sm text-left ">
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
          </tr>
          {list?.length > 0 &&
            list?.map(item => (
              <tr key={item.id} className="bg-white dark:bg-gray-800">
                <td className="px-6 py-4 dark:text-white border-b font-medium dark:border-neutral-500">{item.email}</td>
                <td className="px-6 py-4 dark:text-white border-b font-medium dark:border-neutral-500">{item.nombre}</td>
                <td className="px-6 py-4 dark:text-white border-b font-medium dark:border-neutral-500">{item.apellido1}</td>
                <td className="px-6 py-4 dark:text-white border-b font-medium dark:border-neutral-500">{item.apellido2}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Listado;
