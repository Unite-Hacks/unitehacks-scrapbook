import React from "react";
import { useSession } from "next-auth/react";
import { BsUpload } from 'react-icons/bs';
import { useDropzone, FileRejection, DropEvent, Accept } from 'react-dropzone';

export const Create = ({
  onDrop,
  accept,
}: {
  onDrop:
    | (<T extends File>(
        acceptedFiles: T[],
        fileRejections: FileRejection[],
        event: DropEvent
      ) => void)
    | undefined;
  accept: string;
}): JSX.Element => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });



  
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

              <div
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...getRootProps({
        className:
          'relative w-2/3 lg:w-1/2 h-72 border border-neutral-400 border-dashed rounded-md flex items-center justify-center cursor-pointer',
      })}
    >
      <input
        type="file"
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...getInputProps({ className: 'w-full h-full opacity-0 z-[100]', accept })}
      />
      <div className="absolute w-full flex flex-col gap-y-6 items-center justify-center text-center">
        <BsUpload className="text-5xl opacity-60" />
        <p className="text-xl lg:text-2xl opacity-60 w-4/5">
          {isDragActive
            ? 'release to drop the files here'
            : 'drag and drop or click to upload your photo file here'}
        </p>
      </div>
    </div>

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
                Post
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


