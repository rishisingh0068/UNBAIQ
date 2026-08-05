// Convert plain editor text into safe display blocks without injecting HTML.
const parseBlogContent = (content) => {
  const blocks = [];
  let paragraphLines = [];
  let listItems = [];
  let listType = null;

  const flushParagraph = () => {
    if (paragraphLines.length) {
      blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
      paragraphLines = [];
    }
  };

  const flushList = () => {
    if (listItems.length) {
      blocks.push({ type: listType, items: listItems });
      listItems = [];
      listType = null;
    }
  };

  content.split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.trim();
    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    const bulletMatch = line.match(/^[-*]\s+(.+)$/);
    const numberedMatch = line.match(/^\d+[.)]\s+(.+)$/);

    if (!line) {
      flushParagraph();
      flushList();
      return;
    }

    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2],
      });
      return;
    }

    if (bulletMatch || numberedMatch) {
      flushParagraph();
      const nextListType = bulletMatch ? "unordered-list" : "ordered-list";

      if (listType && listType !== nextListType) {
        flushList();
      }

      listType = nextListType;
      listItems.push((bulletMatch || numberedMatch)[1]);
      return;
    }

    flushList();
    paragraphLines.push(line);
  });

  flushParagraph();
  flushList();
  return blocks;
};

const BlogContent = ({ content }) => {
  const blocks = parseBlogContent(content || "");

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === "heading") {
          const headingClass =
            block.level === 1
              ? "text-[27px] sm:text-[31px]"
              : "text-[21px] sm:text-[24px]";

          return (
            <h2 key={key} className={`font-semibold text-[#06365f] ${headingClass}`}>
              {block.text}
            </h2>
          );
        }

        if (block.type === "unordered-list") {
          return (
            <ul key={key} className="list-disc space-y-2 pl-6">
              {block.items.map((item, itemIndex) => (
                <li key={`${item}-${itemIndex}`}>{item}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "ordered-list") {
          return (
            <ol key={key} className="list-decimal space-y-2 pl-6">
              {block.items.map((item, itemIndex) => (
                <li key={`${item}-${itemIndex}`}>{item}</li>
              ))}
            </ol>
          );
        }

        return <p key={key}>{block.text}</p>;
      })}
    </div>
  );
};

export default BlogContent;
