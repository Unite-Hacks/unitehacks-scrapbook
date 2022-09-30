import prisma from "../../../lib/prisma";
import { ProjectCardType } from "../..";
import Markdown from "../../../components/Markdown";
import Image from "next/future/image";

const ViewProject = ({ project }: { project: ProjectCardType }) => {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-6 lg:p-8">
      <h1 className="text-5xl font-black">{project.title}</h1>

      <div className="flex items-center justify-start space-x-6 overflow-y-auto">
        {project.files?.map((file) => {
          return (
            <Image
              key={file.url}
              width={(file.width * 288) / file.height}
              height={288}
              src={file.url}
              alt="post image"
            />
          );
        })}
      </div>

      <div className="flex flex-col space-y-6  md:justify-between md:space-y-4">
        <div className="w-full space-y-2 rounded-lg border-4 border-gray-500 bg-gray-700 p-4 ">
          <h3 className="text-md font-semibold">
            Teammates
          </h3>
          <div className="space-y-2">
            {project.contributors.map((contributor, i) => {
              return (
                <div
                  key={i}
                  className="relative flex items-center space-x-3 rounded-lg"
                >
                  <p className="font-semibold">@{contributor.username}</p>
                </div>
              );
            })}
          </div>
        </div>

        <Markdown>{project.description}</Markdown>
      </div>
    </div>
  );
};

export default ViewProject;

export async function getServerSideProps(context: any) {
  const { projectid } = context.params;

  let project = await prisma.project.findUnique({
    where: {
      id: projectid,
    },
    include: {
      files: true,
      contributors: {
        select: {
          name: true,
          username: true,
          avatar: true,
          id: true,
        },
      },
    },
  });

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: { project }, // will be passed to the page component as props
  };
}