import { NextRequest, NextResponse } from "next/server"

export default function middleware(req: NextRequest){
    const token = req.cookies.get('token')?.value

    const signInURL = new URL('/login', req.url)

    if(!token){
        if(req.nextUrl.pathname === '/login'){
            return NextResponse.next()
        }
        
        return NextResponse.redirect(signInURL)
    }
}

export const config = {
    matcher: ['/', '/dashboard/:path*']
}