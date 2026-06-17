import {NextResponse} from 'next/server';
import {query} from '@/lib/db';
import bcrypt from 'bcryptjs';


export async function POST(request:Request){
    try{
        const {nombre, apellido, correo, contraseña} = await request.json();
       

        if(!nombre || !apellido || !correo || !contraseña){
            return NextResponse.json({mensaje:"Todos los campos son obligatorios"}, {status:400});
        }

        const sqlSearch = "SELECT id_usuario, nombre, apellido, correo, password FROM usuarios WHERE correo = ? ";
        const usuarioexistente:any = await query(sqlSearch,[correo]);

        if(usuarioexistente.length>0){
            return NextResponse.json({mensaje:"Este correo ya esta en uso"}, {status:400});
        }
        const hash = await bcrypt.hash(contraseña,10);
        const sqlInsert = 'INSERT INTO usuarios(nombre, apellido, correo, password) values(?,?,?,?)';
        const usuarionuevo = await query(sqlInsert, [nombre, apellido, correo,hash]);
        return NextResponse.json({ mensaje: "Usuario registrado correctamente"}, {status:201});

    }
    catch(error){
        console.error("Error en registro:", error);
        return NextResponse.json({mensaje:"Error al registrar"}, {status:500});
    }
}