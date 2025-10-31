import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../state/UserContext";

import Logo from "../logo/Logo";
import UserAvatar from "../user-avatar/UserAvatar";
import Button from "../button/Button";

import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();
  const { logout, user } = useUserContext();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link to="/">
          <Logo />
        </Link>
        <div className={styles.avatar}>
          <UserAvatar name={user?.name} />
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </header>
  );
}
