const API_URL = "http://localhost:3001/";

export default async function request(
  endpoint: string,
  method: "POST" | "GET",
  body?: string
) {
  const data = await fetch(API_URL + endpoint, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((respData) => {
      return respData;
    })
    .catch((error) => {
      throw error;
    });
  return data;
}
