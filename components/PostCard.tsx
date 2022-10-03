import Markdown from "./Markdown";
import { File, User } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

export const ProjectCard = ({
  project,
}: {
  project: {
    id?: string;
    title: string;
    description: string;
    //contributors: Pick<User, "id" | "username" | "avatar">[];
    files: File[];
  };
  className?: string;
  noBorder?: boolean;
}) => {
  return (
    <div
      className="relative mb-4 w-full space-y-4 rounded-lg">
      {"id" in project ? (
        <Link href={`/post/view/${project.id}`}>
          <a className="mx-auto !mt-0 block w-fit">
            <h2 className="text-center text-xl font-semibold hover:underline">
              {project.title}
            </h2>
          </a>
        </Link>
      ) : (
        <h2 className="!mt-0 text-center text-xl font-semibold">
          {project.title}
        </h2>
      )}

      {/* {JSON.stringify(project)} */}
      <Markdown>{project.description}</Markdown>
      {project.files.map((file) => {
        return (
          <Image
            className="mx-auto w-full max-w-sm rounded-lg"
            key={file.url}
            src={file.url}
            alt="project image"
            width={file.width}
            height={file.height}
          />
        );
      })}

      
    </div>
  );
};