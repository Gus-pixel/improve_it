"use client"
import { useContext } from "react";
import LoginPage from "./login/page";
import { AuthContext } from "./auth/auth";
import Home from "./home/page";

export default function App() {
  const { usuario } = useContext(AuthContext);

  if (usuario) {
    return <LoginPage />;
  } else{
    return <Home />;
  }
}
 