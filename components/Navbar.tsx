import Link from 'next/link';
import Button from './Button';
export default function Navbar(){
    return(
        <nav>
            <div className="astralogo"> <img src="" alt="" /></div>
          <ul>
            <li><Link href="/dashboard/pacientes"> Pacientes</Link></li>
            <li> <Link href="/dashboard/citas "> Citas Proximas</Link> </li>
            <li><Link href="/dashboard/agenda"> Agenda</Link></li>
            <button type='button' onClick={()=>{window.location.href ='/login'}}> Cerrar sesión</button>       
         </ul>
        </nav>
    );
}