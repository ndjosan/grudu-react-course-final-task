import { getTweets, tweet } from "../api/user";
import { useEffect, useState } from "react";
import type { Tweet as TweetType } from "../types/types";
import Tweet from "../components/tweet/Tweet";

import styles from "./HomePage.module.css";
import TweetForm from "../components/tweet-form/TweetForm";
import { useUserContext } from "../state/UserContext";

export default function HomePage() {
  const { user } = useUserContext();
  const [tweets, setTweets] = useState<Array<TweetType>>([]);

  async function fetchTweets() {
    const tweets = await getTweets();
    setTweets(tweets);
    console.log(tweets);
  }

  useEffect(() => {
    fetchTweets();
  }, []);

  async function onTweetSubmit(text: string) {
    if (user?.id) {
      try {
        await tweet(user.id, text);
        await fetchTweets();
      } catch (error) {
        alert("Something went wrong");
      }
    }
  }

  return (
    <div className={styles.container}>
      <TweetForm formClass={styles.tweetForm} onSubmit={onTweetSubmit} />
      <div className={styles.tweetsContainer}>
        {tweets
          .map((tweet) => (
            <Tweet key={tweet.id} name={tweet.author_id} tweet={tweet.text} />
          ))
          .reverse()}
      </div>
    </div>
  );
}
