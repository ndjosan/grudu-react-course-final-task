import request from "./request";
import type { User } from "../types/types";

export async function signup(userInfo: User): Promise<User> {
  return await request("users", "POST", JSON.stringify(userInfo));
}

export async function login(username: string, password: string): Promise<User> {
  return await request(`users/${username}`, "GET");
}

export async function getTweets() {
  return await request("tweets", "GET");
}

export async function tweet(author_id: string, text: string) {
  return await request(
    "tweets",
    "POST",
    JSON.stringify({
      author_id,
      text,
    })
  );
}
