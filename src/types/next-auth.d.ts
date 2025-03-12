import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string; // Agrega la propiedad `role`
    id?: string;   // Agrega la propiedad `id` si es necesario
  }

  interface Session {
    user?: {
      role?: string; // Agrega la propiedad `role` al objeto `user` en la sesión
      id?: string;   // Agrega la propiedad `id` si es necesario
    } & DefaultSession["user"];
  }
}

declare module "next/server" {
    interface NextRequest {
        auth?: {
        user?: {
            role?: string;
            id?: string;
        };
        };
    }
}