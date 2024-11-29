import Link from "next/link";
import CheckIcone from "../_components/check/CheckIcone";
import Sidebar from "../_components/sidebar";
import commonStyles from "../common.module.css";
import * as api from "../api/api";
import { UUID } from "crypto";
import { revalidatePath } from "next/cache";

export type Setor = {
  id: UUID;
  nome: string;
  status: boolean;
};

export default async function Setor() {
  const setores = await api.get<Setor[]>("setor");

  revalidatePath("/setor");

  return (
    <div className={commonStyles.homeContainer}>
      <Sidebar />
      <div className={commonStyles.pageContainer}>
        <header className={commonStyles.header}>
          <h1 className={commonStyles.title}>Setores</h1>
          <p className={commonStyles.description}>
            Bem-vindo à página de setores. Aqui você pode criar e gerenciar os
            setores dos usuários do sistema.
          </p>
        </header>
        <table className={commonStyles.table}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Nome do Setor</th>
              <th>
                <Link href="/setor/cadastro">
                  <button className={commonStyles.botao}>Novo setor</button>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {setores
              .sort((a, b) => Number(b.status) - Number(a.status))
              .map((setor) => (
                <tr
                  key={setor.id}
                  className={!setor.status ? commonStyles.disabled : ""}
                >
                  <td>
                    <CheckIcone checked={setor.status} />
                  </td>
                  <td>{setor.nome}</td>
                  <td>
                    <Link href={`/setor/${setor.id}`}>
                      <button className={commonStyles.botao}>Editar</button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
