import { useState } from "react";
import { login as loginRequest } from "../../api/user";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../state/UserContext";
import { validateUsername, validatePassword } from "../../utils/validations";

import FormInput from "../form-input/FormInput";
import Button from "../button/Button";

import styles from "./FormLogin.module.css";

export default function FormLogin() {
  const [formState, setFormSate] = useState<
    Record<string, { value: string; touched: boolean; error: string }>
  >({
    username: { value: "", touched: false, error: "" },
    password: { value: "", touched: false, error: "" },
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useUserContext();

  function validateField(field: string, value: string) {
    switch (field) {
      case "username":
        return validateUsername(value);
      case "password":
        return validatePassword(value);
      default:
        return "";
    }
  }

  function handleChange(field: string, value: string) {
    setFormSate((prev) => {
      const touched = prev[field].touched;
      const error = touched ? validateField(field, value) : prev[field].error;
      return { ...prev, [field]: { ...prev[field], value, error } };
    });
  }

  function handleBlur(field: string) {
    setFormSate((prev) => {
      const value = prev[field].value;
      const error = validateField(field, value);
      return { ...prev, [field]: { ...prev[field], touched: true, error } };
    });
  }

  const isFormValid = Object.values(formState).every(
    (field) => field.error === "" && field.touched
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isFormValid) {
      try {
        const loginResponse = await loginRequest(
          formState.username.value,
          formState.password.value
        );
        login(loginResponse);
        navigate("/");
      } catch (error) {
        setErrorMessage("Invalid username or password");
      }
    } else {
      setErrorMessage("Inputs not valid");
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormInput
          name="username"
          label="username"
          type="text"
          value={formState.username.value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={formState.username.error}
          touched={formState.username.touched}
        />
        <FormInput
          name="password"
          label="password"
          type="password"
          value={formState.password.value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={formState.password.error}
          touched={formState.password.touched}
        />
        <Button classNames={styles.submitButton} disabled={!isFormValid}>
          Login
        </Button>
      </form>
      <p className={styles.errorText}>{errorMessage}</p>
    </>
  );
}
