import "server-only";

import { tryCatch } from "./try-catch";

export const getCountry = async (headers: Headers) => {
  const ip = headers.get("x-forwarded-for")?.split(",")[0];

  let country = "Unknown";

  if (ip && ip.trim().length !== 0) {
    const [fetchError, res] = await tryCatch(fetch(`https://ipwho.is/${ip}`));
    if (fetchError) {
      console.error(fetchError);
    }

    if (res?.ok) {
      country = (await res.json()).country_code ?? "Unknown";
    }
  }

  return country;
};
