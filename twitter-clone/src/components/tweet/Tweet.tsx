import UserAvatar from "../user-avatar/UserAvatar";

import styles from "./Tweet.module.css";

interface TweetProps {
  name: string;
  tweet: string;
}

export default function Tweet({ name, tweet }: TweetProps) {
  return (
    <article className={styles.post}>
      <UserAvatar
        name={name}
        nameClass={styles.name}
        credentialsClass={styles.credentials}
      />
      <p
        className={styles.tweet}
        dangerouslySetInnerHTML={{ __html: tweet }}
      ></p>
    </article>
  );
}
