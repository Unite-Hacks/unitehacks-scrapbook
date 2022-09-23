import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

const proseClasses = [
  "prose-headings:mt-0 prose-headings:mb-4 prose-headings:text-[length:inherit] prose-headings:font-semibold",
  "prose-h1:font-bold prose-h1:before:content-['#_']",
  "prose-h2:font-bold prose-h2:before:content-['##_']",
  "prose-h3:font-bold prose-h3:before:content-['###_']",
  "prose-h4:font-bold prose-h4:before:content-['####_']",
  "prose-h5:font-bold prose-h5:before:content-['#####_']",
  "prose-h6:font-bold prose-h6:before:content-['######_']",
];

const Markdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      className={`${proseClasses.join(
        " "
      )} prose leading-normal prose-p:mb-2 prose-ul:my-2 prose-hr:my-8 dark:prose-invert`}
      remarkPlugins={[remarkGfm, remarkBreaks]}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;