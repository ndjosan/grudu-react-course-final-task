import { Outlet } from "react-router-dom";
import { useUserContext } from "../state/UserContext";

import Header from "../components/header/Header";

import styles from "./Layout.module.css";

export default function Layout() {
  const { user } = useUserContext();
  return (
    <div className={styles.site}>
      {user && <Header />}
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
