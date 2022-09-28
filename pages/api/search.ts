import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import prisma from "../../lib/prisma";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    res.status(401).send("Unauthorized");
    return;
  }

  if (!req.body?.username) {
    res.status(400).send("Missing required fields");
    return;
  }

  const { username } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  res.status(200).json({
    id: user.id,
    name: user.name,
    username: user.username,
    image: user.avatar,
  });
}