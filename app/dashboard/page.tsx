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
                <h1 className='title'>Bienvenido a astra! Doctor(a): {nombre}  {apellido}</h1>
                <Navbar className='navigation'></Navbar>
                
                </div>
                <div className='main'>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id </th>
                                    <th> Nombre </th>
                                    <th>Apellido</th>
                                    <th>Edad</th>
                                    <th>Altura</th>
                                    <th>Peso</th>
                                    <th>Alergia</th>
                                    <th>Padecimientos</th>
                                    <th>Proxima cita</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <div className="options">
                        <Link className='enlace' href='/agregar'> Registrar Paciente</Link>
                        <Link className='enlace' href='/eliminar'> Eliminar Paciente</Link>
                        <Link className='enlace' href='/modificarPaciente'>Modificar Datos del Paciente</Link>
                        <Link className='enlace' href='/agendar'> Agendar Cita</Link>
                        <Link className='enlace' href='/eliminarCita'>Eliminar Cita</Link>
                        <Link className='enlace' href='/reagendar'>Reagendar Cita</Link>
                </div>

                    
            </div>
            
           
        </>
    );
}