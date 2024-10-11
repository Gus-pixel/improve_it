import styles from "./page.module.css";
import commonStyles from "../common.module.css";
import clsx from "clsx";

export default function ProjectCard (){
    return (
        <div className={styles.projectBox}>
            <h1>Projeto 1</h1>
            <span>10-10</span>
            <h2>Descrição</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                Ipsum, atque consequuntur et dicta vero sunt nesciunt perferendis 
                debitis impedit necessitatibus nostrum veniam sint rem ab corrupti! 
                Recusandae animi doloribus eum.
            </p>
            <button className={clsx(commonStyles.botao, styles.botao)}>Visualizar</button>
        </div>
    );
}