import { NextSeo } from "next-seo";
const title = "Unite Hacks Scrapbook";
const description =
  "Check out what everyone is building at Leland Hacks!";
const url = "https://scrapbook.unitehacks.com";
const Meta = () => {
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title,
        description,
        url,
        type: "website",
      }}
      twitter={{
        cardType: "summary",
      }}
    />
  );
};

export default Meta;