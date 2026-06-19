import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET(){
    const cookieStore = await cookies();
    const token = cookieStore.get('astra_session')?.value;

    if(!token){
        return NextResponse.json({mensaje: "No Autorizado"}, {status:401});
    }

    try{
        const secret  = new TextEncoder().encode(process.env.JWT_SECRET);
        const {payload} = await jwtVerify(token, secret);
        //Devuelve los datos al frontend limpios
        return NextResponse.json({nombre: payload.nombre, apellido:payload.apellido ,correo:payload.correo})
    }
    catch(error){
        return NextResponse.json({mensaje:"token invalido"}, {status:401});
    }
}