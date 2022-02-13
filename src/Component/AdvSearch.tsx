import { FC, Fragment, useEffect, useState } from "react";
import { richData as data } from "../data";
import { Highlighter, Selected } from "./Highlighter";
import { Parser } from "./Parser";

// let timeout: NodeJS.Timeout;

export const AdvSearch: FC = () => {
  const [displayData, setDisplayData] = useState<Selected[]>([]);
  const [search, setSearch] = useState("");
  const [selectedData, setSelectedData] = useState<number | undefined>();

  useEffect(() => {
    // if (timeout) {
    //   clearTimeout(timeout);
    // }
    // timeout = setTimeout(() => {}, 2000);
    setDisplayData(() =>
      search
        ? data
            .filter((item) =>
              item.message.toLowerCase().includes(search.toLowerCase())
            )
            .map((item) => {
              const regex = new RegExp(search.toLowerCase(), "g");
              const sub = item.message
                .toLowerCase()
                .indexOf(search.toLowerCase());
              return {
                message: item.message,
                startIndex: sub,
                searchLength: search.length,
                matchIndexes: [
                  ...item.message.toLowerCase().matchAll(regex),
                ].map((match) => match.index!),
                id: item.id,
              };
            })
        : []
    );
  }, [search]);

  return (
    <Fragment>
      <div className="input">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSelectedData(undefined);
            setSearch(e.target.value);
          }}
          autoFocus
        />
      </div>
      {search ? (
        <Highlighter
          data={displayData}
          setSelected={(id) => {
            setSearch("");
            setSelectedData(id);
          }}
          search={search}
        />
      ) : (
        <div>
          <ul>
            {data.map((data) => (
              <li
                style={{
                  backgroundColor:
                    selectedData === data.id ? "yellow" : "transparent",
                }}
                key={Math.random().toString().slice(3, 8)}
              >
                <Parser text={data.message} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Fragment>
  );
};
