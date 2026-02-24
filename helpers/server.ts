import { createHash } from "crypto";
import type { NextApiRequest } from "next";

export const getSessionId = (req: NextApiRequest | Request) => {
  let ipAddress = "localhost";

  if (req instanceof Request) {
    ipAddress = req.headers.get("x-forwarded-for") || "localhost";
  } else {
    ipAddress = (req.headers["x-forwarded-for"] as string) || "localhost";
  }

  // hashes the user's IP address and combines it with
  // a salt to create a unique session ID that preserves
  // the user's privacy by obscuring their IP address.
  const currentSessionId = createHash("md5")
    .update(ipAddress + (process.env?.SALT_IP_ADDRESS || ""), "utf-8")
    .digest("hex");

  return currentSessionId;
};
