import Tabla from "../tabla"
import Naver from "./nav"


function Agendar() {
  return (
      <div className='h-screen min-w-375 min-h-667'>
        <Naver></Naver>
        <Tabla/>
      </div>
  )
}

export default Agendar;
