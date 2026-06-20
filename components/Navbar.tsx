import Link from 'next/link';
interface navProps{
    className?:string
}
export default function Navbar({className}: navProps){
    return(
        <nav className={className}>
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