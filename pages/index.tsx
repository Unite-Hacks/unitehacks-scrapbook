//import type { NextPage } from "next";
import { ProjectCard } from "../components/PostCard";
import prisma from "../lib/prisma";
import { File, Project, User } from "@prisma/client";
import { PostGrid } from "../components/PostGrid";
import Link from "next/link";


export type ProjectCardType = Project & {
  contributors: User[];
  files: File[];
};

export default function Home({ projects }: { projects: ProjectCardType[] }) {
  return (
    <>
      <div className="px-4">
        <div className="mx-auto max-w-md sm:max-w-7xl">
          <h1 className="text-center text-3xl  textstyle">
            Unite Hacks Scrapbook
          </h1>
          <h2 className="mb-5 text-center text-[20px] text-white textsmallstyle ">
            Check out what everyone&apos;s working on and creating at Unite
            Hacks!
          </h2>
          {projects.length === 0 ? (
          <p className="mt-5 text-center text-xl text-white">
            No posts yet. Why don&apos;t you{" "}
            <Link href="/post/create">
              <a className="text-blue-700 hover:text-[#ADD8E6]">
                create your own
              </a>
            </Link>
            ?
          </p>
        ) : (
          <PostGrid>
            {projects.map((project) => {
              return <ProjectCard key={project.id} project={project} />;
            })}
          </PostGrid>
        )}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  let projects = await prisma.project.findMany({
    include: {
      contributors: {
        select: {
          name: true,
          username: true,
          avatar: true,
          id: true,
        },
      },
      files: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    props: { projects }, // will be passed to the page component as props
  };
}
