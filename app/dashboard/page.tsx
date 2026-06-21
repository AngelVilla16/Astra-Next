"use client";
import '../styles/dashboard.css';
import {useState, useEffect} from 'react';
import Navbar from '../../components/Navbar';
import Link from 'next/link';


export default function Dashboard(){

    const [nombre, setNombre] = useState<string>("");
    const [apellido, setApellido] = useState<string>("");

    //useEffect para que se ejecute la peticion al cargar la pagina
    useEffect(()=>{
        //fetch a la ruta creada de la API
        fetch("/api/usuarios")
        //Desempaqueta el contenido del json
            .then((res)=>res.json())
            //data son los datos desempaquetados
            .then((data)=>{
                if (data.nombre){
                    setNombre(data.nombre)
                    setApellido(data.apellido)
                    console.log(data)
                }
            });
    },[]);

    

    return(

        <>
            <div className="header">
                <h1 className='title'> Bienvenido a Astra</h1>
                <div className="navigation">
                    <Navbar />
                </div>
                <p>Doctor(a): {nombre} {apellido}</p>
            </div>
            <div className="main">
                <table className='dgv-pacientes'>
                    <thead>
                      <th>Id</th>
                      <th>Nombre </th>
                      <th>Apellido </th>
                      <th>Edad</th>
                      <th>Altura</th>
                      <th>Peso</th>
                      <th>Alergias</th>
                      <th>Padecimientos</th>
                      <th>Proxima Cita</th>
                    </thead>
                    <tbody>
                        <td>
                            1
                        </td>
                        <td>
                            hola
                        </td>
                    </tbody>
                </table>
                <div className="options">
                    <Link className='enlace' href="">Registrar Paciente</Link>
                    <Link className='enlace' href="">Eliminar Paciente</Link>
                    <Link  className='enlace' href="">Modificar datos del paciente</Link>
                    <Link className='enlace' href="">Agendar Cita</Link>
                    <Link className='enlace' href="">Reagendar Cita</Link>
                    <Link className='enlace'  href="">Cancelar Cita</Link>
                </div>
            </div>
           
        </>
    );
}