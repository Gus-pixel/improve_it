"use client";

import { createContext, useState } from "react";
import { Usuario } from "../usuario/page";

export type AuthContextType = {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  usuario: null,
  setUsuario: () => {},
});


export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  return (
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}
