import { Login_token } from "./clientactions";

export const apiinstance = async (url, options) => {
  const key = process.env.NEXT_PUBLIC_SPURTCMS_NEXTJS_STARTER_APIKEY
    ? process.env.NEXT_PUBLIC_SPURTCMS_NEXTJS_STARTER_APIKEY
    : process.env.NEXT_PUBLIC_SPURTCMS_NEXTJS_STARTER_DEFAULT_APIKEY;

  const Token = Login_token();

  const headers = {
    "Content-Type": "application/json",
    Authorization: process.env.NEXT_PUBLIC_SPURTCMS_NEXTJS_STARTER_THEME_TOKEN,
    ApiKey: key,
  };

  if (Token) {
    headers["Userkey"] = Token;
  }
  const config = {
    method: options.method || "GET",
    headers,
    ...options,
  };

  if (config.method === "GET") {
    delete config.body;
  } else {
    config.body = config.body;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SPURTCMS_NEXTJS_STARTER_THEME_BASEURL}${url}`,
      config
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
