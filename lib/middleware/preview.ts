import { auth } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await auth(req, res);
  if (session) {
    console.log(session);
    // Do something with the session
    // return res.json("This is protected content.");
  }
  console.log(session.user);
  //   res.status(401).json("You must be signed in.");
};
