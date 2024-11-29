import { UUID } from "crypto";
import CheckIcone from "../_components/check/CheckIcone";
import Sidebar from "../_components/sidebar";
import commonStyles from "../common.module.css";
import { Usuario } from "../usuario/page";
import Link from "next/link";
import * as api from "../api/api";

export type Melhoria = {
  id: UUID;
  desc_problema: string;
  desc_melhoria: string;
  data: Date;
  status: boolean;
  aprovacao: boolean;
  usuario: Usuario;
  pilar: string;
};

export default async function Melhoria() {
  const melhorias = await api.get<Melhoria[]>("melhoria");

  return (
    <div className={commonStyles.homeContainer}>
      <Sidebar />
      <div className={commonStyles.pageContainer}>
        <table className={commonStyles.table}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Problema</th>
              <th>Idéia de melhoria</th>
              {/* <th>Funcionário</th> */}
              {/* <th>Data</th> */}
              <th>Aprovação</th>
              <th>
                <Link href="/melhoria/cadastro">
                  <button className={commonStyles.botao}>Nova melhoria</button>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {melhorias.map(melhoria => (
              <tr key={melhoria.id}>
                <td>
                <CheckIcone checked={melhoria.status} />
              </td>
              <td>{melhoria.desc_problema}</td>
              <td>{melhoria.desc_melhoria}</td>
              {/* <td>{melhoria.pilar.nome}</td> */}
              {/* <td>{melhoria.usuario.nome}</td> */}
              {/* <td className={commonStyles.recentDate}>{String(new Date(melhoria.data))}</td> */}
              <td>
                <CheckIcone checked={melhoria.aprovacao} />
              </td>
              </tr>
            ))}
            {/* <tr>
              <td>
                <CheckIcone checked />
              </td>
              <td>Melhoria de setor</td>
              <td>Inovação</td>
              <td>Joãozinho</td>
              <td className={commonStyles.recentDate}>25/23/12</td>
              <td className={commonStyles.recentDate}>
                <CheckIcone checked />
              </td>
              <td>
                <button className={commonStyles.botao}>Ver</button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
