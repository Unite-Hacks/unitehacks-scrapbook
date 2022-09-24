import React from "react";
import { useSession } from "next-auth/react";

const create = () => {
  const { data: session }: any = useSession();

  return (
    <div className="px-4 pb-8">
      {session ? (
        <div className="mx-auto flex max-w-7xl flex-col gap-x-8 gap-y-10 lg:flex-row">
          <div className="flex-grow space-y-8">
            <h1 className="text-center text-3xl textstyle">
              Post to Your Scrapbook
            </h1>

            <div className="flex flex-col">
              <label htmlFor="title" className="font-semibold">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="rounded-lg border-2 px-2 py-1 "
              />
            </div>

            <div className="space-y flex flex-col">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <textarea
                id="description"
                className="rounded-lg border-2 px-2 py-1"
              />
            </div>

            <div className="space-y-4">
              <div className="space-y flex flex-col">
                <label htmlFor="contributors" className="font-semibold">
                  Teammate
                </label>
                <div className="relative h-full before:absolute before:left-2 before:top-1 before:content-['@']">
                  <input
                    id="contributors"
                    type="text"
                    placeholder="Type a username here, then press enter."
                    className="w-full rounded-lg py-1 pl-4 pr-2"
                  />
                </div>
              </div>

              <input
                name="image"
                type="file"
                className="mx-auto block w-full"
                // accept="image/*, video*/"
                accept="image/png, image/jpeg, image/jpg"
                multiple
              />

              <div className="flex flex-wrap gap-4">
                <div className="relative">
                  <button
                    className="group absolute top-0 right-0 flex h-6 w-6 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary-100/40 duration-200 hover:bg-primary-200 hover:duration-100"
                    type="button"
                  >
                    <div className="text-white duration-200 group-hover:text-primary-800 group-hover:duration-100" />
                  </button>
                  <img className="w-32" />
                </div>
              </div>
              <button
                type="button"
                className="rounded-md bg-blue-700 px-4 py-1.5 text-white duration-300 hover:duration-100 enabled:hover:bg-primary-200 disabled:cursor-not-allowed disabled:saturate-50"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-2xl textstyle items-center">
          Please <a className="text-blue-700" href="/signin">sign</a> in to post.
        </div>
      )}
    </div>
  );
};

export default create;
