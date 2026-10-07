"use client";

import {
  useMemo,
  useState,
} from "react";
import {
  ChevronDown,
  Search,
} from "lucide-react";

import { faqItems } from "./faq.data";

export function FaqList() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const value = query
      .trim()
      .toLowerCase();

    if (!value) {
      return faqItems;
    }

    return faqItems.filter(
      ({ question, answer }) =>
        `${question} ${answer}`
          .toLowerCase()
          .includes(value),
    );
  }, [query]);

  return (
    <div>
      <label className="relative block">
        <span className="sr-only">
          Search frequently asked questions
        </span>

        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
        />

        <input
          type="search"
          value={query}
          onChange={(event) =>
            setQuery(
              event.target.value,
            )
          }
          placeholder="Search questions..."
          autoComplete="off"
          aria-controls="faq-results"
          className="min-h-13 w-full border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 hover:border-zinc-400 focus:border-brand focus:ring-2 focus:ring-brand/15"
        />
      </label>

      <p
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {filtered.length ===
        faqItems.length
          ? `${filtered.length} frequently asked questions available.`
          : `${filtered.length} matching frequently asked questions found.`}
      </p>

      {filtered.length > 0 ? (
        <ol
          id="faq-results"
          className="mt-6 border-l border-t border-zinc-200 bg-white"
        >
          {filtered.map(
            (
              {
                question,
                answer,
              },
              index,
            ) => (
              <li key={question}>
                <details className="group border-b border-r border-zinc-200 transition open:bg-[#fafaf8]">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-5 py-5 sm:px-6">
                    <div className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-1 text-[9px] font-black tracking-[.16em] text-brand-dark"
                      >
                        {String(
                          index + 1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <span className="text-sm font-black leading-6 tracking-[-.015em] text-zinc-950 sm:text-base">
                        {question}
                      </span>
                    </div>

                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center border border-zinc-200 bg-white transition group-open:border-brand group-open:bg-brand"
                    >
                      <ChevronDown
                        aria-hidden="true"
                        className="size-4 transition-transform duration-300 group-open:rotate-180"
                      />
                    </span>
                  </summary>

                  <div className="px-5 pb-6 sm:px-6">
                    <p className="max-w-3xl pl-0 text-sm leading-7 text-zinc-600 sm:pl-9">
                      {answer}
                    </p>
                  </div>
                </details>
              </li>
            ),
          )}
        </ol>
      ) : (
        <div
          id="faq-results"
          role="status"
          className="mt-6 border border-zinc-200 bg-white px-6 py-10 text-center"
        >
          <p className="text-sm font-bold text-zinc-950">
            No matching questions found.
          </p>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Try a different keyword or contact the exhibition team.
          </p>
        </div>
      )}
    </div>
  );
}