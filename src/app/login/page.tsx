"use client";

import React, { FormEvent, useContext } from "react";
import styles from "./page.module.css";
import commonStyles from "../common.module.css";
import Logo from "../public/Logo";
import clsx from "clsx";
import { AuthContext } from "../auth/auth";
import * as api from "../api/api";
import { useRouter } from "next/navigation";
import { UsuarioLogin } from "../usuario/page";

export default function LoginPage() {
  const { setUsuario } = useContext(AuthContext);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const usuarioLogin = {
      usuario: form.usuario.value,
      senha: form.senha.value,
    };

    try {
      const res = await api.post<UsuarioLogin>("login", usuarioLogin);

      const usr = {
        id: res.id,
        nome: res.nome,
        cargo: res.cargo,
        status: res.status,
        setor: res.setor,
      }

      if (!usr.status) {
        alert("Usuário inativo.");
        return;
      }

      setUsuario(usr);
      localStorage.setItem("usuario", JSON.stringify(usr));

      router.push("/home?refresh=true");
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      alert("Usuário ou senha inválidos.");
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.loginBoxContent}>
          <h2>Faça seu Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="usuario">Usuário</label>
            <input type="text" id="usuario" name="usuario" />

            <label htmlFor="senha">Senha</label>
            <input type="password" id="senha" name="senha" />
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
