import styles from "./page.module.css"
import ProjectCard from "./ProjectCard";

export default function Home () {
    return (
        <div className={styles.homeContainer}>
            <div className={styles.cards}>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
            </div> 
        </div>
    );
}