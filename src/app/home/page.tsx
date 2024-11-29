"use client";
import { useRouter } from "next/navigation";
import commonStyles from "@/app/common.module.css";
import Sidebar from "@/app/_components/sidebar";

export default function Home() {
  const router = useRouter();

  const navigateToMelhoria = () => {
    router.push("/melhoria");
  };

  return (
    <div className={commonStyles.homeContainer}>
      <Sidebar />
      <div className={commonStyles.pageContainer}>
        {/* Cabeçalho */}
        <header className={commonStyles.header}>
          <h1 className={commonStyles.title}>Página Inicial</h1>
          <p className={commonStyles.description}>
            Bem-vindo à página de melhorias. Aqui você pode criar e gerenciar melhorias no processo.
          </p>
        </header>

        {/* Botão para navegação */}
        <div className={commonStyles.buttonContainer}>
          <button className={commonStyles.mainButton} onClick={navigateToMelhoria}>
            Acessar Melhorias
          </button>
        </div>
      </div>
    </div>
  );
}
