import { createElement, FC } from "react";

export const Parser: FC<{ text: string }> = ({ text }) => {
  const firstNode = getHtmlFromText(text);

  // const parser = new DOMParser();
  // const htmlDoc = parser.parseFromString(text, "text/html");
  // console.log(htmlDoc);
  const formatStringToCamelCase = (str: string) => {
    const splitted = str.split("-");
    if (splitted.length === 1) return splitted[0];
    return (
      splitted[0] +
      splitted
        .slice(1)
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join("")
    );
  };

  const getStyleObjectFromString = (str: string) => {
    const style: { [id: string]: string } = {};
    str.split(";").forEach((el) => {
      const [property, value] = el.split(":");
      if (!property) return;

      const formattedProperty = formatStringToCamelCase(property.trim());
      style[formattedProperty] = value?.trim();
    });

    return style;
  };

  function getHtmlFromText(text: string) {
    const range = document.createRange();
    range.selectNode(document.body); // required in Safari
    const fragment = range.createContextualFragment(
      text
        .replace(/\n/g, "")
        .replace(/[\t ]+</g, "<")
        .replace(/>[\t ]+</g, "><")
        .replace(/>[\t ]+$/g, ">")
    );
    return fragment.firstChild;
  }

  function parseHtmlToReact(node: ChildNode): React.ReactElement {
    if (
      node.childNodes.length === 0 ||
      (node.childNodes.length === 1 && node.childNodes[0].nodeType === 3)
    ) {
      return createElement(
        node.nodeType === 3 ? "p" : node.nodeName.toLowerCase(),
        {
          key: Math.random(),
          style: getStyleObjectFromString(
            (node as any).attributes.style?.nodeValue || "padding: 0"
          ) as any,
        },
        [(node as any).innerText]
      );
    }
    return createElement(
      node.nodeType === 3 ? "p" : node.nodeName.toLowerCase(),
      {
        key: Math.random(),
        style: getStyleObjectFromString(
          (node as any).attributes.style?.nodeValue || "padding: 0"
        ) as any,
      },
      [...node.childNodes].map((childNode) =>
        childNode.nodeType === 3
          ? childNode.nodeValue
          : parseHtmlToReact(childNode)
      )
    );
  }

  // console.log(
  //   htmlDoc,
  //   (firstNode as any).localName,
  //   fragment,
  //   firstNode?.childNodes,
  //   firstNode?.nodeName
  // );

  // console.log(
  //   createElement((firstNode as any).localName, {}, [
  //     (firstNode as any).innerHTML,
  //   ])
  // );

  // console.log(parseHtmlToReact(firstNode!));

  return (
    <div className="parser">
      {/* {createElement((firstNode as any).localName, {}, [
        (firstNode as any).innerHTML,
      ])} */}
      {parseHtmlToReact(firstNode!)}
    </div>
  );
};
