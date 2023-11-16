import React, {useEffect, useState } from "react";
import campus1 from '../assets/campus.png'
import { jwtDecode } from "jwt-decode";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./utils/styles.css";
import { format } from 'date-fns';


//import AuthContext from "./context/authContext";



export default function Tabla() {
  const [RNombre, setNombre] = useState('');
  const [RCorreo, setCorreo] = useState('');
  const [Eleccion, setEleccion] = useState('1');
  const [HoraInicio, setHoraInicio] = useState('');
  const [Horas, setHoras] = useState([])
  //const [HoraFin, setHoraFin] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [options, setOptions] = useState([]);
  const [CampoTexto, setCampoTexto] = useState('');
  const [Cancha, setCancha] = useState('');
  const [rescuedCorreo, setRescuedCorreo] = useState("");
  const [rescuedNombre, setRescuedNombre] = useState("");


useEffect(()=>{
  fetchData();
  Datos_Rellenar();
  if (Eleccion) {
    fetchHoras(Eleccion);
  } else {
    fetchHoras('1'); // Inicializa las horas con la cancha con ID 1
  }
}, []);

let hasFetchedHours = false;

async function fetchData(){
  const url = 'https://api-v3-espaciosucm.onrender.com/api/v3/espaciosdeportivos/';
  fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ sessionStorage.getItem('access')
      },
  })
  .then(response => response.json())
  .then(json => setCancha(json))
}

async function fetchHoras(CanchaID) {
  if (!hasFetchedHours) {
    hasFetchedHours = true;
    const url = `https://api-v3-espaciosucm.onrender.com/api/v3/horarios-disponibles/${CanchaID}/`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("access"),
      },
    })
      .then((response) => response.json())
      .then((json) => setHoras(json));
  }
}
async function Datos_Rellenar(){
  const datos = jwtDecode(sessionStorage.access ?? "");
  setRescuedCorreo(datos?.email);
  setRescuedNombre(datos?.nombre + ' ' + datos?.apellido1);
}

function getID(){
  return sessionStorage.getItem('id');
}
function reserva(e) {
  e.preventDefault();
  const url = 'https://api-v3-espaciosucm.onrender.com/api/v3/login/reservar/';
  const cod_usuario = getID();
  const fechaFormateada = format(selectedDate, 'yyyy-MM-dd');

  let datos1 ={
    fecha_reserva: fechaFormateada,
    solicita_equipo: options,
    equipo_descripcion: CampoTexto,
    cod_usuario: cod_usuario,
    espacio_reserva: Eleccion,
    horario_reserva: HoraInicio
  }

  console.log(datos1)

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('access'),
    },
    body: JSON.stringify(datos1),
  })
}

  return (
    <div className="relative flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 via-teal-300 to-blue-300">
      <form 
        className="bg-white shadow-md rounded p-4 mt-4 mb-5 w-full md:w-1/2 lg:w-1/3 "
        onSubmit={reserva}
      >
        <div className="text-xl">
          <label className="block text-gray-800 text-xl font-bold mb-4">Datos</label>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/5 mb-3 md:pr-3">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Nombre"
                value={RNombre}
                onChange={(ev) => setNombre(ev.target.value)}
              />
            </div>
            <div className="w-full md:w-3/5">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Correo"
                value={RCorreo}
                onChange={(ev) => setCorreo(ev.target.value)}
                pattern="^[a-zA-Z0-9._%+-]+@(alu.ucm\.cl|ucm\.cl)$"    
              />
            </div>
          </div>
          <br />
          <div>
            <label className="block text-gray-220 text-xl font-bold mb-4">Cancha</label>
            <select
              className="py-2 px-2 pr-8 block w-full border rounded w-full text-xl focus:outline-none focus:shadow-outline dark:bg-slate-100 dark:text-black-400"
              value={Eleccion}
              name="eleccion"
              onChange={(e) => {
                const selectedValue = e.target.value;
                setEleccion(selectedValue);
                fetchHoras(selectedValue);
              }}
            >
              {Cancha.length > 0 && Cancha.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nombre_espacio}
                </option>
              ))}
            </select>
          </div>
          <div className="my-4">
            <label className="block text-gray-800 text-xl font-bold mb-2">Espacios deportivos:</label>
            <img
              src={campus1}
              alt="Imagen de espacios deportivos"
              className="max-w-xs h-auto"
            />
          </div>
          <div className="my-4">
            <label className="block text-gray-800 text-xl font-bold mb-2">¿Necesita equipo?</label>
            <div className="flex">
              <input
                type="radio"
                value="si" 
                name="equipo"
                onChange={() => setOptions(true)}
              />
              <label className="ml-2">Si</label>
              <input
                className='ml-2'
                type="radio"
                value="false"
                name="equipo"
                onChange={() => setOptions(false)} 
              />
              <label className="ml-2">No</label>
            </div>
          </div>
          <div className="my-4">
            <label className="block text-gray-800 text-xl font-bold mb-2">Seleccione una fecha:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              className="my-datepicker-style"
            />
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 mb-3 md:pr-3">
              <select
                className="py-2 px-2 pr-8 block w-full border rounded w-full text-xl focus:outline-none focus:shadow-outline dark:bg-slate-100 dark:text-black-400"
                value={HoraInicio}
                name="horainicio"
                onChange={(e) => setHoraInicio(e.target.value)}
              >
                {Horas.length > 0 && Horas.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.horario_string}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <textarea
            value={CampoTexto}
            name="campotexto"
            onChange={(e) => setCampoTexto(e.target.value)}
            placeholder="Ingrese datos adicionales de ser necesario" // Texto de marcador de posición
            className="resize-none w-full h-16 mt-4 p-2 border rounded text-gray-700 focus:outline-none focus:shadow-outline"
          />
          <div className="flex flex-col md:flex-row items-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Enviar
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 md:mt-0 ml-0 md:ml-2 focus-shadow-outline"
              type="button"
            >
              Limpiar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}