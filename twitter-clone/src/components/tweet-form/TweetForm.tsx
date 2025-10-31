import { useState } from "react";
import type { Field } from "../../types/types";
import { validateTweet } from "../../utils/validations";

import Button from "../button/Button";
import FormInput from "../form-input/FormInput";

import styles from "./TweetForm.module.css";

interface ClassProps {
  formClass: string;
}

interface TweetProps extends ClassProps {
  onSubmit: (text: string) => Promise<void>;
}

export default function TweetForm({ formClass, onSubmit }: TweetProps) {
  const [tweet, setTweet] = useState<Field>({
    value: "",
    touched: false,
    error: "",
  });

  const isFormValid = !tweet.error && tweet.touched;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;
    try {
      await onSubmit(tweet.value);
    } catch (error) {}
  }

  function handleChange(field: string, value: string) {
    setTweet((prev) => {
      const error = validateTweet(value);
      return { ...prev, value, error };
    });
  }

  function handleBlur() {
    setTweet((prev) => {
      const error = validateTweet(prev.value);
      return { ...prev, touched: true, error };
    });
  }

  return (
    <form className={`${styles.form} ${formClass}`} onSubmit={handleSubmit}>
      <FormInput
        textarea={true}
        name="tweet"
        onChange={handleChange}
        onBlur={handleBlur}
        value={tweet.value}
        touched={tweet.touched}
        error={tweet.error}
      />
      <Button classNames={styles.submit} disabled={!isFormValid}>
        Tweet
      </Button>
    </form>
  );
}
