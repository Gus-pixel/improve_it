import { UUID } from "crypto";
import CheckIcone from "../_components/check/CheckIcone";
import Sidebar from "../_components/sidebar";
import commonStyles from "../common.module.css";
import { Usuario } from "../usuario/page";
import Link from "next/link";

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

export default function Melhoria() {
  return (
    <div className={commonStyles.homeContainer}>
      <Sidebar />
      <div className={commonStyles.pageContainer}>
        <table className={commonStyles.table}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Problema</th>
              <th>Pilar</th>
              <th>Funcionário</th>
              <th>Data</th>
              <th>Aprovação</th>
              <th>
                <Link href="/melhoria/cadastro">
                  <button className={commonStyles.botao}>Nova melhoria</button>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
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
            </tr>
            <tr className={commonStyles.disabled}>
              <td>
                <CheckIcone checked={false} />
              </td>
              <td>Melhoria de limpeza</td>
              <td>Tudo sujo no almopxarifado</td>
              <td className={commonStyles.pastDate}>25/12/60</td>
              <td>
                <button className={commonStyles.botao}>Ver</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
