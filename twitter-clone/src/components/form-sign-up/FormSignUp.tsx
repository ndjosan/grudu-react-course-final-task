import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/user";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../utils/validations";

import FormInput from "../form-input/FormInput";
import Button from "../button/Button";

import styles from "./FormSignUp.module.css";

export default function FormSignUp() {
  const [formState, setFormSate] = useState<
    Record<string, { value: string; touched: boolean; error: string }>
  >({
    username: { value: "", touched: false, error: "" },
    password: { value: "", touched: false, error: "" },
    email: { value: "", touched: false, error: "" },
    name: { value: "", touched: false, error: "" },
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function validateField(field: string, value: string) {
    switch (field) {
      case "username":
        return validateUsername(value);
      case "password":
        return validatePassword(value);
      case "email":
        return validateEmail(value);
      case "name":
        return validateName(value);
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
        await signup({
          name: formState.name.value,
          email: formState.email.value,
          password: formState.password.value,
          id: formState.username.value,
        });
        navigate("/login");
      } catch (error) {
        setErrorMessage("Something went wrong");
      }
    } else {
      setErrorMessage("Inputs not valid");
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormInput
          name="email"
          label="email"
          type="email"
          value={formState.email.value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={formState.email.error}
          touched={formState.email.touched}
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
          name="name"
          label="full name"
          type="text"
          value={formState.name.value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={formState.name.error}
          touched={formState.name.touched}
        />
        <Button classNames={styles.submitButton} disabled={!isFormValid}>
          Sign Up
        </Button>
      </form>
      <p className={styles.errorText}>{errorMessage}</p>
    </>
  );
}
