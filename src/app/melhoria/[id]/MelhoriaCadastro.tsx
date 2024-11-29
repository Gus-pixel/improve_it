"use client";

import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect } from "react";
import * as api from "@/app/api/api";
import commonStyles from "@/app/common.module.css";
import Sidebar from "@/app/_components/sidebar";
import { Melhoria } from "../page";

export type Pilar = {
  id: string;
  nome: string;
};

type MelhoriaCadastroProps = {
  pilares: Pilar[];
};

export default function MelhoriaCadastro({ pilares }: MelhoriaCadastroProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isEditing = !pathname.includes("cadastro");
  const id = pathname.split("/")[2];

  useEffect(() => {
    if (isEditing && id) {
      verifyId(id);
    }
  }, [isEditing, id]);

  async function verifyId(id: string) {
    try {
      const melhoria = await api.get<Melhoria>("melhoria", id);

      const problemaElement = document.getElementById("problema") as HTMLInputElement;
      if (problemaElement) problemaElement.value = melhoria.desc_problema || "";

      const melhoriaElement = document.getElementById("melhoria") as HTMLInputElement;
      if (melhoriaElement) melhoriaElement.value = melhoria.desc_melhoria || "";

      const pilarElement = document.getElementById("pilar") as HTMLSelectElement;
      if (pilarElement) pilarElement.value = melhoria.pilar || "";
    } catch (error) {
      console.error("Erro ao buscar melhoria:", error);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
  
    const newMelhoria = {
        desc_problema: formData.get("problema") as string ?? "",
        desc_melhoria: formData.get("melhoria") as string ?? "",
        id_pilar: formData.get("pilar") as string ?? "",
        data: new Date(),
        id_usuario: "ba603dbc-cd84-4472-9175-293b4e2a5739",
        aprovacao: false,
        status: true,
    };
    
  
    try {
        await api.post("melhoria", newMelhoria);
        router.push("/melhoria");
    } catch (error) {
        console.error("Erro ao salvar melhoria:", error);
    }
  }
  

  return (
    <div className={commonStyles.homeContainer}>
      <Sidebar />
      <div className={commonStyles.pageContainer}>
        <form className={commonStyles.form} onSubmit={(e) => handleSubmit(e)}>
          <h2>Melhoria</h2>
          <label htmlFor="pilar">Pilar</label>
          <select name="pilar" id="pilar">
            {pilares.map((pilar) => (
              <option key={pilar.id} value={pilar.id}>
                {pilar.nome}
              </option>
            ))}
          </select>
          <label htmlFor="problema">Problema</label>
          <input type="text" id="problema" name="problema" required />
          <label htmlFor="melhoria">Melhoria</label>
          <input type="text" id="melhoria" name="melhoria" required />
          <button type="submit" className={commonStyles.botao}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
