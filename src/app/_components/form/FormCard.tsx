import clsx from "clsx";
import styles from "../form/index.module.css"
import commonStyles from "../../common.module.css";

export default function FormCard (){
    return (
        <div className={styles.projectBox}>
            <h1>Projeto 1</h1>
            <h2>Pergunta 1</h2>
            <input type="text" placeholder="Resposta" className={styles.formInput}/>
            <h2>Pergunta 2 - notas</h2>
            <div className={styles.radioInput}>
            <input type="radio" name="pergunta2" id="pergunta2" />1
            <input type="radio" name="pergunta2" id="pergunta2" />2
            <input type="radio" name="pergunta2" id="pergunta2" />3
            <input type="radio" name="pergunta2" id="pergunta2" />4
            </div>

            <button className={clsx(commonStyles.botao, styles.botao)}>Visualizar</button>
        </div>
    );
}