"use client";

import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect } from "react";
import * as api from "@/app/api/api";
import commonStyles from "@/app/common.module.css";
import Sidebar from "@/app/_components/sidebar";
import { UsuarioLogin } from "../page";
import { AuthContext } from "@/app/auth/auth";
import { Setor } from "@/app/setor/page";

interface UsuarioCadastroProps {
  setores: Setor[];
}

export default function UsuarioCadastro({ setores }: UsuarioCadastroProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { usuario } = useContext(AuthContext);
  const isAdmin = usuario?.cargo;
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
        statusElement.value = usuario.status ? "ativo" : "inativo";
      }

      const cargoElement = document.getElementById(
        "cargo"
      ) as HTMLSelectElement;
      if (cargoElement) {
        cargoElement.value = usuario.cargo ? "gestor" : "funcionario";
      }

      const setorElement = document.getElementById(
        "setor"
      ) as HTMLSelectElement;
      if (setorElement) {
        setorElement.value = usuario.setor.id;
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
      console.error("Erro ao buscar usuário:", error);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let formUsuario = {};

    if (!isAdmin) {
      formUsuario = {
        nome: formData.get("nome"),
        usuario: formData.get("usuario"),
        senha: formData.get("senha"),
      };
    } else {
      formUsuario = {
        nome: formData.get("nome"),
        status: formData.get("status") === "ativo",
        cargo: formData.get("cargo") === "gestor",
        id_setor: formData.get("setor"),
        usuario: formData.get("usuario"),
        senha: formData.get("senha"),
      };
    }

    try {
      if (!isEditing) {
        await api.post("usuario", formUsuario);
        alert("Usuário cadastrado com sucesso!");
      } else {
        await api.put(`usuario/${id}`, formUsuario);
        alert("Usuário atualizado com sucesso!");
      }

      if (isAdmin) {
        router.push("/usuario?refresh=true");
      } else {
        router.push("/home");
      }
    } catch (error) {
      alert(`Erro ao salvar usuário: ${error}`);
    }
  }

  return (
    <div className={commonStyles.homeContainer}>
      <Sidebar />
      <div className={commonStyles.pageContainer}>
        <form className={commonStyles.form} onSubmit={handleSubmit}>
          <h2>Usuário</h2>
          {isAdmin && (
            <>
              <label htmlFor="status">Status</label>
              <select name="status" id="status">
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
              <label htmlFor="cargo">Cargo</label>
              <select name="cargo" id="cargo">
                <option value="gestor">Gestor</option>
                <option value="funcionario">Funcionário</option>
              </select>
              <label htmlFor="setor">Setor</label>
              <select name="setor" id="setor">
                {setores
                  .filter((setor) => setor.status)
                  .map((setor) => (
                    <option key={setor.id} value={setor.id}>
                      {setor.nome}
                    </option>
                  ))}
              </select>{" "}
            </>
          )}
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" name="nome" />
          <label htmlFor="usuario">Usuário</label>
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
