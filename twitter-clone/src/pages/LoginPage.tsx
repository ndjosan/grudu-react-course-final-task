import { Link } from "react-router-dom";
import FormLogin from "../components/form-login/FormLogin";

import styles from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <FormLogin />
      <p className={styles.message}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
