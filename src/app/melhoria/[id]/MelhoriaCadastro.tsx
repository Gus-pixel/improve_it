"use client";

import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useRef } from "react";
import * as api from "@/app/api/api";
import commonStyles from "@/app/common.module.css";
import Sidebar from "@/app/_components/sidebar";
import { Melhoria } from "../MelhoriaComponent";
import { AuthContext } from "@/app/auth/auth";

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
  const { usuario } = useContext(AuthContext);
  const originalData = useRef<Melhoria | null>(null);

  useEffect(() => {
    if (isEditing && id) {
      fetchMelhoria(id);
    }
  }, [isEditing, id]);

  async function fetchMelhoria(id: string) {
    try {
      const fetchedMelhoria = await api.get<Melhoria>("melhoria", id);
      originalData.current = fetchedMelhoria;

      // Populate the form fields with fetched data for visualization
      (document.getElementById("problema") as HTMLInputElement).value =
        fetchedMelhoria.desc_problema || "";
      (document.getElementById("melhoria") as HTMLInputElement).value =
        fetchedMelhoria.desc_melhoria || "";
      (document.getElementById("pilar") as HTMLSelectElement).value =
        fetchedMelhoria.pilar.id || "";
    } catch (error) {
      console.error("Erro ao buscar melhoria:", error);
    }
  }

  async function handleSubmit(aprovacaoForm?: boolean) {
    if (isEditing) {
      // Modo de edição: garantir que `originalData` esteja carregado
      if (!originalData.current) {
        console.error("Nenhuma melhoria carregada para edição!");
        return;
      }

      const updatedFields = {
        aprovacao: aprovacaoForm ?? originalData.current.aprovacao,
        status: aprovacaoForm !== false, // true se aprovado, false se rejeitado
      };

      try {
        await api.put(`melhoria/${id}`, updatedFields);
        router.push("/melhoria");
      } catch (error) {
        console.error("Erro ao atualizar melhoria:", error);
      }
    } else {
      // Modo de criação: envia todos os campos do formulário
      const form = document.getElementById("melhoriaForm") as HTMLFormElement;
      if (!form) {
        console.error("Formulário não encontrado!");
        return;
      }

      const formData = new FormData(form);

      const newMelhoria = {
        desc_problema: formData.get("problema") as string,
        desc_melhoria: formData.get("melhoria") as string,
        id_pilar: formData.get("pilar") as string,
        data: new Date(),
        id_usuario: usuario?.id,
        aprovacao: aprovacaoForm ?? false,
        status: aprovacaoForm !== false,
      };

      try {
        await api.post("melhoria", newMelhoria);
        router.push("/melhoria");
      } catch (error) {
        console.error("Erro ao salvar melhoria:", error);
      }
    }
  }

  return (
    <div className={commonStyles.homeContainer}>
      <Sidebar />
      <div className={commonStyles.pageContainer}>
        <form id="melhoriaForm" className={commonStyles.form}>
          <h2>{isEditing ? "Editar Melhoria" : "Nova Melhoria"}</h2>

          <label htmlFor="pilar">Pilar</label>
          <select name="pilar" id="pilar" disabled={isEditing}>
            {pilares.map((pilar) => (
              <option key={pilar.id} value={pilar.id}>
                {pilar.nome}
              </option>
            ))}
          </select>

          <label htmlFor="problema">Problema</label>
          <input
            type="text"
            id="problema"
            name="problema"
            required
            disabled={isEditing}
          />

          <label htmlFor="melhoria">Melhoria</label>
          <input
            type="text"
            id="melhoria"
            name="melhoria"
            required
            disabled={isEditing}
          />

          {isEditing ? (
            <div className={commonStyles.buttonGroup}>
              <button
                type="button"
                className={commonStyles.botao}
                onClick={() => handleSubmit(true)} // Aprovar
              >
                Aprovar
              </button>
              <button
                type="button"
                className={commonStyles.botao}
                onClick={() => handleSubmit(false)} // Não Aprovar
              >
                Não Aprovar
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={commonStyles.botao}
              onClick={() => handleSubmit()}
            >
              Enviar
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
