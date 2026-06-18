import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { SignJWT } from 'jose';

export async function POST(request: Request) {
    try {
        const { correo, contraseña } = await request.json();

        // 1. Corregido: Agregado status 400
        if (!correo || !contraseña) {
            return NextResponse.json({ mensaje: "Todos los campos son obligatorios" }, { status: 400 });
        }

        const sql = 'SELECT id_usuario, nombre, apellido, correo, password FROM usuarios WHERE correo = ? LIMIT 1';
        const response: any = await query(sql, [correo]); 

        if (response.length === 0) {
            return NextResponse.json({ mensaje: "Usuario o contraseña incorrectos" }, { status: 401 });
        }
        
        // Extraemos el primer registro encontrado
        const datosUsuario = response[0];

        // Validar contraseña
        const correctPassword = await bcrypt.compare(contraseña, datosUsuario.password);
        
        if (!correctPassword) {
            return NextResponse.json({ mensaje: "Usuario o contraseña incorrectos" }, { status: 401 });
        }

      
        const payload = { 
            id: datosUsuario.id_usuario, 
            nombre: datosUsuario.nombre,
            correo: datosUsuario.correo 
        };
        
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);


        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' }) 
            .setIssuedAt()
            .setExpirationTime('2h')
            .sign(secret);

        // Guardar la cookie de sesión de Astra
        const cookieStore = await cookies();
        cookieStore.set('astra_session', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 2, // 2 horas
            path: '/',
        });

        return NextResponse.json({ mensaje: "Bienvenido", usuario: payload }, { status: 200 });

    } catch (error) {
        console.error("Error en sesión:", error);
        return NextResponse.json({ mensaje: "Error al iniciar sesión" }, { status: 500 });
    }
}