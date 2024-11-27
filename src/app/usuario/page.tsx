import Link from "next/link";
import CheckIcone from "../_components/check/CheckIcone";
import Sidebar from "../_components/sidebar";
import commonStyles from "../common.module.css";

export default function Usuario() {
  return (
    <div className={commonStyles.homeContainer}>
      <Sidebar />
      <div className={commonStyles.pageContainer}>
        <table className={commonStyles.table}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Nome</th>
              <th>Cargo</th>
              <th>
                <Link href="/usuario/cadastro">
                  <button className={commonStyles.botao}>Novo usuário</button>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <CheckIcone checked />
              </td>
              <td>Gustavo</td>
              <td>Gestor</td>
              <td>
                <button className={commonStyles.botao}>Editar</button>
              </td>
            </tr>
            <tr className={commonStyles.disabled}>
              <td>
                <CheckIcone checked={false} />
              </td>
              <td>Francisca</td>
              <td>Funcionário</td>
              <td>
                <button className={commonStyles.botao}>Editar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
