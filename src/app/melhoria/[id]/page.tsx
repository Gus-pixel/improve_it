"use client";

import Sidebar from "@/app/_components/sidebar";
import commonStyles from "@/app/common.module.css";
import { verifyCadastro, verifyStatus, verifyStatusString } from "@/app/utils";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect } from "react";
import * as api from "../../api/api";
import { Melhoria } from "../page";

export default function MelhoriaCadastro() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newMelhoria = {
      status: true,
      desc_problema: formData.get("problema"),
      melhoria: formData.get("melhoria"),
      data: new Date().toDateString(),
      aprovacao: false,
      usuario: {},
    };

    await api
      .put(`melhoria`, newMelhoria)
      .then(() => {
        alert("Melhoria enviada com sucesso!");

        router.push("/melhoria?refresh=true");
      })
      .catch((error) => {
        alert(`Erro ao atualizar melhoria: ${error}`);
      });
  }

  return (
    <div className={commonStyles.homeContainer}>
      <Sidebar />
      <div className={commonStyles.pageContainer}>
        <form className={commonStyles.form} onSubmit={(e) => handleSubmit(e)}>
          <h2>Melhoria</h2>
          <p>{verifyCadastro(pathname)} de melhoria</p>
          <label htmlFor="pilar">Pilar</label>
          <select name="pilar" id="pilar">
            <option value="ativo">Eficiência</option>
          </select>
          <label htmlFor="problema">Problema</label>
          <input type="text" id="problema" name="problema" />
          <label htmlFor="melhoria">Melhoria</label>
          <input type="text" id="melhoria" name="melhoria" />
          <button type="submit" className={commonStyles.botao}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
