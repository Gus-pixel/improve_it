"use client";
import { UUID } from "crypto";
import CheckIcone from "../_components/check/CheckIcone";
import Sidebar from "../_components/sidebar";
import commonStyles from "../common.module.css";
import { Usuario } from "../usuario/page";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../auth/auth";
import styles from "./melhoria.module.css";
import { Pilar } from "./[id]/MelhoriaCadastro";

export type Melhoria = {
  id: UUID;
  desc_problema: string;
  desc_melhoria: string;
  data: Date;
  status: boolean;
  aprovacao: boolean;
  usuario: Usuario;
  pilar: Pilar;
};

type MelhoriaProps = {
  melhorias: Melhoria[];
};

export default function MelhoriaComponent({ melhorias }: MelhoriaProps) {
  const { usuario } = useContext(AuthContext);
  const isAdmin = usuario?.cargo;

  return (
    <div className={commonStyles.homeContainer}>
      <Sidebar />
      <div className={commonStyles.pageContainer}>
        <header className={commonStyles.header}>
          <h1 className={commonStyles.title}>Melhorias</h1>
          <p className={commonStyles.description}>
            Bem-vindo à página de melhorias. Aqui você pode gerenciar
            as melhorias propostas pelos funcionários.
          </p>
        </header>
        <table className={commonStyles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>Status</th>
              <th>Pilar</th>
              <th>Problema</th>
              <th>Idéia de melhoria</th>
              <th>Funcionário</th>
              <th>Aprovação</th>
              <th>
                {!isAdmin && (
                  <Link href="/melhoria/cadastro">
                    <button className={commonStyles.botao}>
                      Nova melhoria
                    </button>
                  </Link>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {melhorias
              .filter((melhoria) => {
                if (isAdmin) {
                  return true;
                } else {
                  return melhoria.usuario.id === usuario?.id;
                }
              })
              .map((melhoria) => (
                <tr key={melhoria.id}>
                  <td>
                    <CheckIcone checked={melhoria.status} />
                  </td>
                  <td>{melhoria.pilar.nome}</td>
                  <td>{melhoria.desc_problema}</td>
                  <td>{melhoria.desc_melhoria}</td>
                  <td>{melhoria.usuario.nome}</td>
                  {/* <td className={commonStyles.recentDate}>{String(new Date(melhoria.data))}</td> */}
                  <td>
                    <CheckIcone checked={melhoria.aprovacao} />
                  </td>
                  <td>
                    {isAdmin && (
                      <Link href={`/melhoria/${melhoria.id}`}>
                        <button className={commonStyles.botao}>Ver</button>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
