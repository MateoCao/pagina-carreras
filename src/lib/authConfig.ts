import type { NextAuthOptions } from "next-auth";

export const authConfig: NextAuthOptions = {
  providers: [], // Aquí defines tus proveedores de autenticación
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};