import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('astra_session')?.value;
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/dashboard")) {
        // Si no tiene token, rebote inmediato
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            // Validar que el JWT sea real y vigente
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            await jwtVerify(token, secret);

            // Si es válido, lo dejamos pasar
            return NextResponse.next();
        } catch (error) {
            // Si el token falló o expiró, limpiamos la cookie y mandamos a loguear
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete('astra_session');
            return response;
        }
    }

 
    if ((pathname === '/login' || pathname === '/register') && token) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            await jwtVerify(token, secret);
            
            // Si su token sigue siendo completamente válido, lo mandamos al dashboard
            return NextResponse.redirect(new URL('/dashboard', request.url));
        } catch (e) {
            // Si el token expiró, no hacemos nada y dejamos que vea la pantalla de login/registro normalmente
        }
    }

    // Para cualquier otra ruta que no sea dashboard, login o register, permitir acceso libre
    return NextResponse.next();
}

// Configurar las rutas que activarán el middleware
export const config = {
    // CORREGIDO: Sintaxis exacta para interceptar sub-rutas en Next.js
    matcher: ['/dashboard/:path*', '/login', '/register'],
};