import { NextResponse } from "next/server";
import {query} from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request:Request){
    try{
        const {correo, contraseña} = await request.json();

        if(!correo || !contraseña){
            return NextResponse.json({mensaje:"Todos los campos son obligatorios"});

        }
        const sql = 'SELECT id_usuario, nombre, apellido, correo, password FROM usuarios WHERE correo = ? LIMIT 1';
        const response:any = await query(sql,[correo]); 
        if(response.length===0){
            return NextResponse.json({mensaje:"Usuario o contraseña incorrectos"}, {status:400});
        }
        const datosUsuario = response[0];

        const correctPassword = await bcrypt.compare(contraseña, datosUsuario.password);

        if(!correctPassword){
            return NextResponse.json({mensaje:"Usuario o contraseña incorrectos"}, {status:400});
        }
         return NextResponse.json({
            mensaje: "¡Inicio de sesión exitoso!",
            usuario: {
                id: datosUsuario.id_usuario,
                nombre: datosUsuario.nombre,
                correo: datosUsuario.correo
            }
        }, { status: 200 });
    }
    catch(error){
        return NextResponse.json({mensaje:"Error al iniciar sesion"}, {status:500});
    }
}