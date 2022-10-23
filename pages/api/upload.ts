import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import cloudinary from "cloudinary";
import { File } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

//set bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,

  api_key: process.env.CLOUDINARY_API_KEY,

  api_secret: process.env.CLOUDINARY_API_SECRET,

  secure: true,
});

export type Media = Omit<File, "projectId">;

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

  let data = await new Promise((resolve, reject) => {
    const form = formidable();

    form.parse(req, (err: any, fields: any, files: any) => {
      if (err) reject({ err });
      resolve({ err, fields, files });
    });
  });

  let { files } = data as any;

  let media: Media[] = [];

  const cloudinaryPromises = [];
  for (const [fileName, file] of Object.entries(files)) {
    const promise = cloudinary.v2.uploader.upload(
      (file as { filepath: string }).filepath,

      function (error: any, result: any) {
        // console.log(result, error);
        console.log(result);

        if (!error) {
          media.push({
            url: result.url,
            mediaType: result.resource_type,
            width: result.width,
            height: result.height,
          });
        }
      }
    );
    cloudinaryPromises.push(promise);
  }

  await Promise.all(cloudinaryPromises);
  res.json(media);

  // res.end();
}
