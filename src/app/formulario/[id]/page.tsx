"use client";

import Sidebar from "@/app/_components/sidebar";
import commonStyles from "@/app/common.module.css";
import { verifyCadastro } from "@/app/utils";
import { usePathname } from "next/navigation";
import styles from "../page.module.css";
import CheckIcone from "@/app/_components/check/CheckIcone";

function Questao() {
  return (
    <div>
      <div>
        <CheckIcone checked />
      </div>
      <span>Questão 1</span>
    </div>
  );
}

export default function FormularioCadastro() {
  const pathname = usePathname();

  return (
    <div className={commonStyles.homeContainer}>
      <Sidebar />
      <div className={commonStyles.pageContainer}>
        <form className={commonStyles.form}>
          <h2>Formulário</h2>
          <p>{verifyCadastro(pathname)} de formulário</p>
          <label htmlFor="status">Status</label>
          <select name="status" id="status">
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
          <label htmlFor="titulo">Título</label>
          <input type="text" id="titulo" name="titulo" />
          <label htmlFor="setor">Setor</label>
          <select name="setor" id="setor">
            <option value="mecanica">mecanica</option>
          </select>
          <button type="submit" className={commonStyles.botao}>
            Salvar
          </button>
        </form>
        <form className={commonStyles.form}>
          <h2>Questões</h2>
          <div className={styles.formQuestao}>
            <div className={styles.questaoInput}>
              <label htmlFor="status">Status</label>
              <select name="status" id="status">
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
            <div className={styles.questaoInput}>
              <label htmlFor="titulo">Pergunta</label>
              <input type="text" id="titulo" name="titulo" />
            </div>
            <div className={styles.questaoInput}>
              <label htmlFor="setor">Setor</label>
              <select name="setor" id="setor">
                <option value="mecanica">mecanica</option>
              </select>
            </div>
          </div>
          <button type="submit" className={commonStyles.botao}>
            Adicionar
          </button>
          <hr className={styles.hr} />
          <Questao />
        </form>
      </div>
    </div>
  );
}
