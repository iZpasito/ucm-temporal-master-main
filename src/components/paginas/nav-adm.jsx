import { Link, NavLink} from "react-router-dom";

function handleLogout() {
  sessionStorage.clear();
}
  

function Navad(){


return(
<nav className="sticky top-0 z-10 bg-white border-gray-200 dark:bg-blue-600 min-w-375">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 min-w-375">
      <Link to="/" className="flex items-center">
          <img src="/src/assets/logoucm.png" className="h-32" alt="UCM" />
          <span></span>
          <div className="ml-20 self-center text-2xl font-semibold whitespace-nowrap dark:text-white" ><h1>UCM Sport Reserve</h1></div>
      </Link>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-xl text-black-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-blue-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only"></span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="text-xl font-medium flex flex-col p-4 md:p-0 mt-4 border border-blue-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-blue-600 md:dark:bg-blue-600 dark:border-blue-400">
        <li>
          <NavLink to='/adm/agendar' className="rounded-none block py-2 pl-3 pr-4 text-blue-900 rounded  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Agendar</NavLink>
        </li>
        <li>
          <NavLink to="/adm/informes" className="rounded-none block py-2 pl-3 pr-4 text-blue-900 rounded  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Informes</NavLink>
        </li>
        <li>
          <NavLink to='/' onClick={handleLogout} className="rounded-none block py-2 pl-3 pr-4 text-blue-900 rounded  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Salir</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
)
}

export default Navad;

