"use client";

import Sidebar from "@/app/_components/sidebar";
import commonStyles from "@/app/common.module.css";
import { verifyCadastro, verifyStatus, verifyStatusString } from "@/app/utils";
import { FormEvent, useEffect } from "react";
import { usePathname } from "next/navigation";
import * as api from "@/app/api/api";
import { useRouter } from "next/navigation";
import { Setor } from "../page";

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
      const setor = await api.get<Setor>("setor", id);

      const nomeElement = document.getElementById("nome") as HTMLInputElement;
      if (nomeElement) {
        nomeElement.value = setor.nome;
      }

      const statusElement = document.getElementById(
        "status"
      ) as HTMLSelectElement;
      if (statusElement) {
        statusElement.value = verifyStatusString(setor.status); // Define o valor do status
      }
    } catch (error) {
      console.error("Erro ao buscar setor:", error);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newSetor = {
      nome: formData.get("nome"),
      status: verifyStatus(String(formData.get("status"))),
    };

    if (!isEditing) {
      await api
        .post("setor", newSetor)
        .then(() => {
          alert("Setor cadastrado com sucesso!");

          router.push("/setor?refresh=true");
        })
        .catch((error) => {
          alert(`Erro ao cadastrar setor: ${error}`);
        });
    } else {
      await api
        .put(`setor/${id}`, newSetor)
        .then(() => {
          alert("Setor atualizado com sucesso!");

          router.push("/setor?refresh=true");
        })
        .catch((error) => {
          alert(`Erro ao atualizar setor: ${error}`);
        });
    }
  }

  return (
    <div className={commonStyles.homeContainer}>
      <Sidebar />
      <div className={commonStyles.pageContainer}>
        <form className={commonStyles.form} onSubmit={(e) => handleSubmit(e)}>
          <h2>Setor</h2>
          <p>{verifyCadastro(pathname)} de setor</p>
          <label htmlFor="nome">Status</label>
          <select name="status" id="status" defaultValue="ativo">
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" name="nome" />
          <button type="submit" className={commonStyles.botao}>
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
