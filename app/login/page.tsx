"use client";
import Button from '../../components/Button';
import Input from '../../components/Input';
import Link from 'next/link';
import {useState} from 'react';

import '../styles/login.css';


export default function Login(){

    const [showpass, setShowPass] = useState<boolean>(false);
    const[correo, setCorreo] = useState<string>("");
    const [contraseña, setContraseña] = useState<string>("");
   const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

   
    const res = await fetch("/api/login", {
        method: "POST", // <--- Cambiado a POST
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contraseña })
    });

    const datos = await res.json();

    if (res.ok) {
        alert("¡Bienvenido de nuevo a Astra!");
        
    } else {
        alert(datos.mensaje); 
    }
};

    return(
        <>
        <div className="container">
            <div className="left">
                <h1 className='title'>Bienvenido a Astra</h1>
                <p className='text'>Tu gestor medico de confianza!</p>
                <p className='text'>Un producto desarrollado por Astrosoft.</p>
            </div>
            <div className="right">
                <form className='login-form' onSubmit={handleLogin}>
                    <h1 className='subtitle'>Por favor ingresa tus credenciales para comenzar</h1>

                    <label htmlFor="Correo"> Correo:</label>
                    <Input type='email' onChange={(e)=>setCorreo(e.target.value)} />
                    <label htmlFor="Contraseña"> Contraseña: </label>
                    <Input type={showpass ? 'text' : 'password' } onChange={(e)=>setContraseña(e.target.value)}/>
                    <Button text="Iniciar sesión" type="submit"/>
                    <div className='showpassdiv'>
                        <label htmlFor="showpass"> Mostrar contraseña</label>
                        <Input type='checkbox' id='showpass'checked={showpass} onChange={(e)=> setShowPass(e.target.checked)} />
                    </div>
                    <Link className="enlace" href="/register" > ¿No esta registrado? Registrese aqui!</Link>
                </form>
            </div>
        </div>
        </>
    );
}