import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import cloudinary from "cloudinary";
import { File } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../lib/prisma";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,

  api_key: process.env.CLOUDINARY_API_KEY,

  api_secret: process.env.CLOUDINARY_API_SECRET,

  secure: true,
});

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

  if (!req.body?.url) {
    res.status(400).send("Missing required fields");
    return;
  }

  const { url } = req.body;
  const file = await prisma.file.findUnique({
    where: {
      url,
    },
  });

  if (file) {
    // we can't delete it
    res.status(400).send("File is used in a post -- unable to delete.");
    return;
  }
  const publicId = url.split("/").slice(7).join("/").split(".")[0];
  await cloudinary.v2.uploader
    .destroy(publicId)
    .then((res) => console.log(res));
  res.end();
}