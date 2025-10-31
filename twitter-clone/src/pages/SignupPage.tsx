import { Link } from "react-router-dom";

import styles from "./Signup.module.css";
import FormSignUp from "../components/form-sign-up/FormSignUp";

export default function SignupPage() {
  return (
    <div className={styles.container}>
      <FormSignUp />
      <p className={styles.message}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
