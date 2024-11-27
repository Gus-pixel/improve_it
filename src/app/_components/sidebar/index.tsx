import Link from "next/link";
import FormularioIcon from "./FormularioIcon";
import styles from "./index.module.css";
import LogoutIcon from "./LogoutIcon";
import MelhoriaIcon from "./MelhoriaIcon";
import SetorIcon from "./SetorIcon";
import UserIcon from "./UserIcon";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <header className={styles.sidebarHeader}>
        <span>
          Bem-vindo <b>Usuário</b>!
        </span>
      </header>

      <nav>
        <Link href="/usuario" className={styles.a}>
          <button>
            <span>
              <i>
                <UserIcon />
              </i>
              <span className={styles.userButton}>Usuário</span>
            </span>
          </button>
        </Link>
        <Link href="/formulario" className={styles.a}>
          <button>
            <span>
              <i>
                <FormularioIcon />
              </i>
              <span>Formulário</span>
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
        <button>
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
