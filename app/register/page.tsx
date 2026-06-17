"use client";
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {useState} from 'react';
import '../styles/register.css';

export default function Register(){
    const [showpass, setShowPass] = useState<boolean>(false);
    const [nombre, setNombre] = useState<string>("");
    const [apellido, setApellido] = useState<string>("");
    const [correo, setCorreo] = useState<string>("");
    const [contraseña, setContraseña] = useState<string>("");
    const [mensaje, setMensaje] = useState<string>("");
    const router= useRouter();


    const handleRegister = async(e:React.FormEvent) =>{
        e.preventDefault();
        setMensaje("");

        //Hacer peticion
        try{
            const response = await fetch("/api/register",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({nombre, apellido, correo, contraseña}),
            })

            const datos = await response.json();

            if(!response.ok){
                setMensaje(datos.mensaje);
                return;

            }
            alert("Usuario registrado con exito en Astra");
            router.push("/login");
        }
        catch(error){
            setMensaje("Hubo un problema con el servidor");
        }

    }

    return(
        <>
        <div className="container">
            <div className="left">
                <h1 className='title'>Bienvenido a Astra</h1>
                <p className='text'>Tu gestor medico de confianza!</p>
                <p className='text'>Un producto desarrollado por Astrosoft.</p>
            </div>
            <div className="right">
                <form className='login-form' onSubmit={handleRegister}>
                    <h1 className='subtitle'>Por favor registrate para comenzar</h1>
                    <label htmlFor="Nombre:">Nombre:</label>
                    <Input type='text' onChange={(e)=>setNombre(e.target.value)}/>
                    <label htmlFor="Apellido"> Apellido: </label>
                    <Input type='text' onChange={(e)=>setApellido(e.target.value)} />
                    <label htmlFor="Correo"> Correo:</label>
                    <Input type='email' onChange={(e)=>setCorreo(e.target.value)} />
                    <label htmlFor="Contraseña"> Contraseña: </label>
                    <Input type={showpass ? 'text' : 'password'} onChange={(e)=>setContraseña(e.target.value)} />
                    <Button text="Iniciar sesión" type="submit" />
                    <div className='showpassdiv'>
                        <label htmlFor="showpass"> Mostrar contraseña</label>
                        <Input type='checkbox' id='showpass'checked={showpass} onChange={(e)=> setShowPass(e.target.checked)} />
                    </div>
                    <Link className="enlace" href="/login" > ¿Ya tiene una cuenta? Inicie sesión aqui</Link>
                </form>
            </div>
        </div>
        </>
    );
}