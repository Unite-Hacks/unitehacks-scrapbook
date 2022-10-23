import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { BsUpload } from "react-icons/bs";
import { useDropzone, FileRejection, DropEvent, Accept } from "react-dropzone";
import { File as Files } from "@prisma/client";
import { useRouter } from "next/router";
import { HiX } from "react-icons/hi";
import ContributorCard from "../../components/ContributorCard";
import { ProjectCard } from "../../components/PostCard";

interface Contributor {
  id: string;
  name: string;
  username: string;
  image: string;
}

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
  const [files, setFiles] = useState<Files[]>([]);
  const [contributorSearch, setContributorSearch] = useState("");
  const [contributorSearchError, setContributorSearchError] = useState("");
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loadingContributor, setLoadingContributor] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const { data: session }: any = useSession();

  const searchForUser = async () => {
    setLoadingContributor(true);
    if (contributorSearch.length === 0) {
      setLoadingContributor(false);
      return;
    }
    if (
      contributors.find((c) => c.username === contributorSearch) ||
      contributorSearch === session!.user?.username
    ) {
      setContributorSearch("");
      setContributorSearchError("");
      setLoadingContributor(false);
      return;
    }
    const res = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: contributorSearch.trim() }),
    });
    if (!res.ok) {
      if (res.status == 404) {
        setContributorSearchError(
          "User not found. Make sure you entered the username correctly."
        );
        setLoadingContributor(false);
      } else {
        setContributorSearchError("Something went wrong :(. Please try again.");
        setLoadingContributor(false);
      }
    } else {
      setContributorSearchError("");
      const contributor = await res.json();
      setContributors((cList) => [...cList, contributor]);
      setContributorSearch("");
      setLoadingContributor(false);
    }
  };

  const removeContributor = (contributorId: string) => {
    setContributors((cList) => cList.filter((c) => c.id !== contributorId));
  };

  const createProject = async () => {
    if (
      title.trim().length === 0 ||
      description.trim().length === 0 ||
      files.length === 0 ||
      uploadingImage ||
      submitted
    ) {
      return;
    }
    console.log(files)
    console.log(contributors)
    console.log(title)
    console.log(description)
    console.log(uploadingImage)
    setSubmitted(true);
    const res = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        contributors: contributors.map((c) => c.id),
        files,
      }),
    });
    if (!res.ok) {
      alert("Something went wrong :(. Please try again.");
      return;
    }
    router.push("/");
  };

  const deleteFile = async (file: Files) => {
    setFiles((files) => files.filter((f) => f.url !== file.url));
    await fetch("/api/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: file.url }),
    });
  };

  return (
    <div className="px-4 pb-8 mb-20">
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y flex flex-col">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>{" "}
              <textarea
                id="description"
                className="rounded-lg border-2 px-2 py-1"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y flex flex-col">
                <label htmlFor="contributors" className="font-semibold">
                  Teammate
                </label>
                <div className="relative h-full before:absolute before:left-2 before:top-1">
                  <input
                    id="contributors"
                    type="text"
                    value={contributorSearch}
                    disabled={loadingContributor}
                    onChange={(e) => setContributorSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        searchForUser();
                      }
                    }}
                    placeholder="Type a username here, then press enter."
                    className="w-full rounded-lg py-1 pl-4 pr-2"
                  />
                </div>
                {contributorSearchError.length > 0 ? (
                  <p className="mt-1 text-sm text-red-300">
                    {contributorSearchError}
                  </p>
                ) : null}
              </div>


              <div
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...getRootProps({
                  className:
                    "relative w-2/3 lg:w-1/2 h-72 border border-neutral-400 border-dashed rounded-md flex items-center justify-center cursor-pointer",
                })}
              >
                <input
                  name="image"
                  type="file"
                  className="w-full h-full opacity-0 z-[100]"
                  accept="image/png, image/jpeg, image/jpg video/mp4"
                  multiple
                  {...getInputProps}
                  onChange={async (e) => {
                    if (e.target.files) {
                      setUploadingImage(true);
                      const fd = new FormData();
                      Array.from(e.target.files).forEach((file, i) => {
                        fd.append(file.name, file);
                      });

                      const media = await fetch("/api/upload", {
                        method: "POST",
                        body: fd,
                      });

                      const newFiles = await media.json();
                      setFiles((f) => [...f, ...newFiles]);
                      e.target.value = "";
                      setUploadingImage(false);
                    // console.log(e.target.files);
                    }
                  }}
                />
                {uploadingImage ? (
                  <p className="text-gray-300">Uploading image(s)...</p>
                ) : null}
                <div className="flex flex-wrap gap-4">
                  {files.map((file) => {
                    return (
                      <div key={file.url} className="relative">
                        <button
                          className="group absolute top-0 right-0 flex h-6 w-6 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary-100/40 duration-200 hover:bg-primary-200 hover:duration-100"
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteFile(file);
                          }}
                        >
                          <HiX className="text-white duration-200 group-hover:text-primary-800 group-hover:duration-100" />
                        </button>
                        <img
                          className="w-32"
                          src={file.url}
                          alt="uploaded image"
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="absolute w-full flex flex-col gap-y-6 items-center justify-center text-center">
                  <BsUpload className="text-5xl opacity-60" />
                  <p className="text-xl lg:text-2xl opacity-60 w-4/5">
                    {isDragActive
                      ? "release to drop the files here"
                      : "drag and drop or click to upload your photo file here"}
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
                onClick={async (e) => {
                  e.preventDefault();
                  await createProject();
                }}
                className="rounded-md bg-blue-700 px-4 py-1.5 text-white duration-300 hover:duration-100 enabled:hover:bg-primary-200 disabled:cursor-not-allowed disabled:saturate-50"
                disabled={
                  title.trim().length === 0 ||
                  description.trim().length === 0 ||
                  files.length === 0 ||
                  loadingContributor ||
                  uploadingImage ||
                  submitted 
                }
              >
                Post
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-2xl textstyle items-center">
          Please{" "}
          <a className="text-blue-700" href="/signin">
            sign
          </a>{" "}
          in to post.
        </div>
      )}
    </div>
  );
};

export default Create;
