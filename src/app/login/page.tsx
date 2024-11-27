"use client";

import React, { FormEvent, useContext, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import commonStyles from "../common.module.css";
import Logo from "../public/Logo";
import clsx from "clsx";
import { AuthContext } from "../auth/auth";
import * as api from "../api/api";
import { useRouter } from "next/navigation";
import { randomUUID } from "crypto";

export default function LoginPage() {
  const { usuario, setUsuario } = useContext(AuthContext);
  const [usuarioSt, setUsuarioSt] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const usuarioData = {
      cargo: true,
      status: true,
    };

    if (usuarioSt === "admin" && senha === "123456") {
      setUsuario(usuarioData);
      router.push("/home?refresh=true");
    }

    setUsuario(usuarioData);

    // try {
    //   await api.post("usuario", usuarioData);
    //   alert("Login efetuado!");
    //   router.push("/home?refresh=true");
    // } catch (error) {
    //   alert(`Credenciais invalidas`);
    // }
  }

  if (usuario) {
    router.push("/home?refresh=true");
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.loginBoxContent}>
          <h2>Faça seu Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={usuarioSt}
              onChange={(e) => setUsuarioSt(e.target.value)}
            />

            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button className={clsx(commonStyles.botao, styles.botao)}>
              ENTRAR
            </button>
          </form>
        </div>
        <div className={styles.loginBoxBackground}>
          <div className={styles.loginBoxHeader}>
            <Logo />
            <div className={styles.loginBoxHeaderTitle}>
              <span>IMPROVE</span>
              <span>IT</span>
            </div>
            <span className={styles.saudacao}>Bem-vindo!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
