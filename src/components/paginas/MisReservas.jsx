import ListadoUser from "../ListadoUser"
import Naver from "./nav"


function ReservasUser() {
  
  return (
      <div className='h-screen min-w-375'>
        <Naver></Naver>
        <ListadoUser></ListadoUser>
      </div>
  )
}

export default ReservasUser