import clsx from "clsx";
import { useState } from "react";

const TableOfContents: React.FC<{ headers: any[] }> = ({ headers = [] }) => {
  const [activeId, setActiveId] = useState<string | undefined>(undefined);

  return (
    <div className="sticky w-[23%] top-[5.5rem] nav shape p-2 max-lg:hidden dark:bg-dark">
      <ul>
        <li
          className={`header-link depth-2 font-heading my-0 font-bold whitespace-nowrap !text-lg ${
            activeId === "overview" ? "active" : ""
          }`.trim()}
        >
          <a href="#overview">Overview</a>
        </li>
        {headers
          .filter(({ depth }) => depth > 1 && depth < 4)
          .map((header) => (
            <li
              key={header.slug}
              className={clsx(
                "header-link",
                "text-sm pl-4",
                `depth-${header.depth}`,
                { active: activeId === header.slug }
              )}
            >
              <a
                href={`#${header.slug}`}
                className={clsx(
                  "group flex items-start py-1 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300",
                  { active: "text-sky-500" }
                )}
              >
                <svg
                  width="3"
                  height="24"
                  viewBox="0 -9 3 24"
                  className="mr-2 text-slate-400 overflow-visible group-hover:text-slate-600 dark:text-slate-600 dark:group-hover:text-slate-500"
                >
                  <path
                    d="M0 0L3 3L0 6"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
                {header.text}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
