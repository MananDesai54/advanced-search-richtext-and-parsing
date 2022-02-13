import { FC } from "react";
import { Parser } from "./Parser";

export type Selected = {
  message: string;
  startIndex: number;
  matchIndexes: number[];
  searchLength: number;
  id: number;
};

export const Highlighter: FC<{
  data: Selected[];
  setSelected: (id: number) => void;
  search: string;
}> = ({ data, setSelected, search }) => {
  const renderHighlightedData = (item: Selected) => {
    const re = new RegExp(search, "gi");
    const elements = item.message.split(/(<[^>]*>)/gi);
    const result = elements.map((ele) => {
      const match = ele.match(/(<[^>]*>)/gi);
      if (!match) {
        return ele.replaceAll(
          re,
          `<span style="background: yellow;">${search}</span>`
        );
      }
      return ele;
    });
    return result.join("");
  };

  return (
    <ul>
      {data.map((item) => (
        <li
          key={Math.random().toString().slice(3, 8)}
          onClick={() => setSelected(item.id)}
          style={{ cursor: "pointer" }}
        >
          <Parser text={renderHighlightedData(item)} />
        </li>
      ))}
    </ul>
  );
};

// import { FC, Fragment } from "react";
// import { Parser } from "./Parser";

// export type Selected = {
//   message: string;
//   startIndex: number;
//   matchIndexes: number[];
//   searchLength: number;
//   id: number;
// };

// export const Highlighter: FC<{
//   data: Selected[];
//   setSelected: (id: number) => void;
// }> = ({ data, setSelected }) => {
//   const renderHighlightedData = (item: Selected) => {
//     const data = item.matchIndexes.map((matchIndex, index) => (
//       <Fragment key={index}>
//         {index === 0 && <Parser text={item.message.slice(0, matchIndex)} />}
//         <span style={{ background: "red" }}>
//           <Parser
//             text={item.message.slice(
//               matchIndex,
//               matchIndex + item.searchLength
//             )}
//           />
//         </span>
//         <Parser
//           text={item.message.slice(
//             matchIndex + item.searchLength,
//             item.matchIndexes[index + 1] || item.message.length
//           )}
//         />
//       </Fragment>
//     ));
//     console.log(data);
//     return data;
//   };

//   return (
//     <ul>
//       {data.map((item) => (
//         <li
//           key={Math.random().toString().slice(3, 8)}
//           onClick={() => setSelected(item.id)}
//           style={{ cursor: "pointer" }}
//         >
//           {renderHighlightedData(item)}
//         </li>
//       ))}
//     </ul>
//   );
// };

// item.matchIndexes.map((matchIndex, index) => (
//   <Fragment key={index}>
//     {index === 0 && item.message.slice(0, matchIndex)}
//     <span style={{ background: "red" }}>
//       {item.message.slice(matchIndex, matchIndex + item.searchLength)}
//     </span>
//     {item.message.slice(
//       matchIndex + item.searchLength,
//       item.matchIndexes[index + 1] || item.message.length
//     )}
//   </Fragment>
// ));
