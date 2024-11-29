"use client";

import React, { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../auth/auth";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { setUsuario } = useContext(AuthContext);

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (usuario) {
      setUsuario(JSON.parse(usuario));
    } else {
      router.push("/login");
    }
  }, [router, setUsuario]);

  return <>{children}</>;
};

export default AuthWrapper;
