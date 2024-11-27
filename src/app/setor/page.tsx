import CheckIcone from "../_components/check/CheckIcone";
import Sidebar from "../_components/sidebar";
import commonStyles from "../common.module.css";

export default function Setor() {
  return (
    <div className={commonStyles.homeContainer}>
      <Sidebar />
      <div className={commonStyles.pageContainer}>
        <table className={commonStyles.table}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Nome do Setor</th>
              <th>
                <button className={commonStyles.botao}>Novo setor</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <CheckIcone checked />
              </td>
              <td>Infraestrutura</td>
              <td>
                <button className={commonStyles.botao}>Editar</button>
              </td>
            </tr>
            <tr className={commonStyles.disabled}>
              <td>
                <CheckIcone checked={false} />
              </td>
              <td>Mecanica</td>
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
