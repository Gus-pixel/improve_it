"use client";

import { createContext, useState } from "react";
import { UsuarioLogin } from "../usuario/page";

export type AuthContextType = {
  usuario: object | null;
  setUsuario: (usuario: object | null) => void;
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
  const [usuario, setUsuario] = useState<object | null>(null);

  return (
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}
