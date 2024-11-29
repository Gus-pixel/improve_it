"use client";
import Link from "next/link";
import FormularioIcon from "./FormularioIcon";
import styles from "./index.module.css";
import LogoutIcon from "./LogoutIcon";
import MelhoriaIcon from "./MelhoriaIcon";
import SetorIcon from "./SetorIcon";
import UserIcon from "./UserIcon";
import { useContext } from "react";
import { AuthContext } from "@/app/auth/auth";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { usuario, setUsuario } = useContext(AuthContext);
  const router = useRouter();
  const isAdmin = usuario?.cargo;

  return (
    <aside className={styles.sidebar}>
      <header className={styles.sidebarHeader}>
        <span>
          Bem-vindo <b>{usuario?.nome}</b>!
        </span>
      </header>

      <nav>
        <Link
          href={isAdmin ? "/usuario" : `/usuario/${usuario?.id}`}
          className={styles.a}
        >
          <button>
            <span>
              <i>
                <UserIcon />
              </i>
              <span className={styles.userButton}>Usuário</span>
            </span>
          </button>
        </Link>
        <Link href="/melhoria" className={styles.a}>
          <button>
            <span>
              <i>
                <MelhoriaIcon />
              </i>
              <span>Melhoria</span>
            </span>
          </button>
        </Link>
        {isAdmin && (
          <>
            <Link href="/formulario" className={styles.a}>
              <button>
                <span>
                  <i>
                    <FormularioIcon />
                  </i>
                  <span>Formulário / Totem</span>
                </span>
              </button>
            </Link>
            <Link href="/setor" className={styles.a}>
              <button>
                <span>
                  <i>
                    <SetorIcon />
                  </i>
                  <span>Setor</span>
                </span>
              </button>
            </Link>
          </>
        )}
        <button
          onClick={() => {
            setUsuario(null);
            router.push("/login");
          }}
        >
          <span>
            <i>
              <LogoutIcon />
            </i>
            <span>Sair</span>
          </span>
        </button>
      </nav>
    </aside>
  );
}
