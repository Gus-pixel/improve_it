"use client";

import Sidebar from "@/app/_components/sidebar";
import commonStyles from "@/app/common.module.css";
import { verifyCadastro, verifyStatus, verifyStatusString } from "@/app/utils";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect } from "react";
import { UsuarioLogin } from "../page";
import * as api from "../../api/api";

export default function UsuarioCadastro() {
  const pathname = usePathname();
  const router = useRouter();
  const isEditing = !pathname.includes("cadastro");
  const id = pathname.split("/")[2];

  useEffect(() => {
    if (isEditing) {
      if (id) {
        verifyId(id);
      }
    }
  }, [isEditing, pathname, id]);

  async function verifyId(id: string) {
    try {
      const usuario = await api.get<UsuarioLogin>("usuario", id);

      const nomeElement = document.getElementById("nome") as HTMLInputElement;
      if (nomeElement) {
        nomeElement.value = usuario.nome;
      }

      const statusElement = document.getElementById(
        "status"
      ) as HTMLSelectElement;
      if (statusElement) {
        statusElement.value = verifyStatusString(usuario.status); // Define o valor do status
      }

      const cargoElement = document.getElementById(
        "cargo"
      ) as HTMLSelectElement;
      if (cargoElement) {
        cargoElement.value = usuario.cargo ? "gestor" : "funcionario"; // Define o valor do cargo
      }

      const usuarioElement = document.getElementById(
        "usuario"
      ) as HTMLInputElement;
      if (usuarioElement) {
        usuarioElement.value = usuario.usuario;
      }

      const senhaElement = document.getElementById("senha") as HTMLInputElement;
      if (senhaElement) {
        senhaElement.value = usuario.senha;
      }
    } catch (error) {
      console.error("Erro ao buscar usuario:", error);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newUsuario = {
      nome: formData.get("nome"),
      status: verifyStatus(String(formData.get("status"))),
      cargo: formData.get("cargo") === "gestor",
      usuario: formData.get("usuario"),
      senha: formData.get("senha"),
    };

    if (!isEditing) {
      await api
        .post("usuario", newUsuario)
        .then(() => {
          alert("Usuário cadastrado com sucesso!");

          router.push("/usuario?refresh=true");
        })
        .catch((error) => {
          alert(`Erro ao cadastrar usuario: ${error}`);
        });
    } else {
      await api
        .put(`usuario/${id}`, newUsuario)
        .then(() => {
          alert("Usuário atualizado com sucesso!");

          router.push("/usuario?refresh=true");
        })
        .catch((error) => {
          alert(`Erro ao atualizar usuario: ${error}`);
        });
    }
  }

  return (
    <div className={commonStyles.homeContainer}>
      <Sidebar />
      <div className={commonStyles.pageContainer}>
        <form className={commonStyles.form} onSubmit={(e) => handleSubmit(e)}>
          <h2>Usuário</h2>
          <p>{verifyCadastro(pathname)} de usuário</p>
          <label htmlFor="nome">Status</label>
          <select name="status" id="status">
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" name="nome" />
          <label htmlFor="cargo">Cargo</label>
          <select name="cargo" id="cargo">
            <option value="gestor">Gestor</option>
            <option value="funcionario">Funcionário</option>
          </select>
          <label htmlFor="email">Usuário</label>
          <input type="text" id="usuario" name="usuario" />
          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" name="senha" />
          <button type="submit" className={commonStyles.botao}>
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
