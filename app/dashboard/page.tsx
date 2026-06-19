"use client";
import {useState, useEffect} from 'react';
import Navbar from '../../components/Navbar';

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
             <Navbar></Navbar>
           </div>
        
        </>
    );
}