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
    contributors: Pick<User, "id" | "username" | "avatar">[];
    files: File[];
  };
  className?: string;
  noBorder?: boolean;
}) => {
  return (
    <div
      className="relative mb-4 space-y-4  bg-white rounded-lg md:mr-[300px] md:ml-[300px]">
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

      <div className="flex space-x-2">
        {project.contributors.map((contributor, i) => {
          return (
            <div key={i} className="relative">

              <div className="absolute translate-y-[0.5rem] -translate-x-[calc(50%-1rem)] rounded-md px-2 font-semibold opacity-0 transition ease-in-out peer-hover:opacity-100 dark:bg-[#4E4C59]">
                <div className="absolute left-1/2 -z-10 -translate-y-2 -translate-x-[29%] -rotate-180">
                  <div className="h-3 w-3 origin-top-left -rotate-45 transform dark:bg-white"></div>
                </div>
                @{contributor.username}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};