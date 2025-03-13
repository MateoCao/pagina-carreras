import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string; 
    id?: string;
  }

  interface Session {
    user?: {
      role?: string;
      id?: string;
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