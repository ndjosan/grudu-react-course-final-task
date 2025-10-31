import { ReactComponent as TwitterIcon } from "../../assets/twitter.svg";

import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={styles.logo}>
      <TwitterIcon />
      Twitter
    </div>
  );
}
