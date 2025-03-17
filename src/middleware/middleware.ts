// import { NextResponse, NextRequest } from "next/server";


// export default async function middleware(req: NextRequest) {
//   const session = await getSession(req); // Obtén la sesión

//   // Logique de redirección basada en la sesión
//   const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

//   if (isAdminRoute && !session) {
//     // Redirige a login si no hay sesión
//     const loginUrl = new URL("/login", req.nextUrl.origin);
//     return NextResponse.redirect(loginUrl);
//   }

//   if (req.nextUrl.pathname.startsWith("/login") && session) {
//     // Redirige al admin si ya hay sesión
//     const adminUrl = new URL("/admin", req.nextUrl.origin);
//     return NextResponse.redirect(adminUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
