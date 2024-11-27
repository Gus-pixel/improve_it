import CheckIcone from "../_components/check/CheckIcone";
import Sidebar from "../_components/sidebar";
import commonStyles from "../common.module.css";

export default function Melhoria() {
  return (
    <div className={commonStyles.homeContainer}>
      <Sidebar />
      <div className={commonStyles.pageContainer}>
        <table className={commonStyles.table}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Título</th>
              <th>Problema</th>
              <th>Data limite</th>
              <th>
                <button className={commonStyles.botao}>Nova melhoria</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <CheckIcone checked />
              </td>
              <td>Melhoria de setor</td>
              <td>bebedouro no setor quebrado</td>
              <td className={commonStyles.recentDate}>25/23/12</td>
              <td>
                <button className={commonStyles.botao}>Editar</button>
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
                <button className={commonStyles.botao}>Editar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
