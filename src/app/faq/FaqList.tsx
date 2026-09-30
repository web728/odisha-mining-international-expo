"use client";

import {
  useMemo,
  useState,
} from "react";
import {
  ChevronDown,
  Search,
} from "lucide-react";

const items = [
  [
    "When and where is the 5th Odisha Mining & Infrastructure International Expo?",
    "The expo runs 07–10 January 2027 at Baramunda Exhibition Ground, Bhubaneswar, Odisha, India.",
  ],
  [
    "Is entry free for visitors?",
    "Yes — entry is free for trade visitors. Register online in advance via the visitor registration page for faster access.",
  ],
  [
    "How do I book a stand as an exhibitor?",
    "Use the exhibitor registration page or contact the sales team directly — Mr. Namit Gupta (+91 98108 55697, namit@futurextrade.com) or Mr. Soumo Roy (+91 80105 79828, soumo@futurextrade.com).",
  ],
  [
    "Who should visit?",
    "Mine owners, developers and operators (MDOs), mineral processing plants, steel and aluminium industry, cement manufacturers, contractors and builders, engineering and consulting firms, distributors, transporters, quarry owners, government officials, financial institutions and trade associations.",
  ],
  [
    "Who organises the expo?",
    "Futurex Trade Fair & Events Pvt. Ltd. (E-52, 1st Floor, Kalkaji, Delhi 110019), in association with Laghu Udyog Bharti, the Odisha Chamber of Commerce and state partner IPICOL.",
  ],
  [
    "How do I get the floor plan or brochure?",
    "Download the brochure from the official brochure page. The hall-wise floor plan with stand numbers is shared on request — email admin@futurextrade.com.",
  ],
  [
    "How do I reach the venue?",
    "Baramunda Exhibition Ground is centrally located in Bhubaneswar with easy access from Biju Patnaik International Airport, Bhubaneswar railway station and the Baramunda bus terminus. See the Venue page for the map.",
  ],
] as const;

export function FaqList() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return items;
    }

    return items.filter(
      ([question, answer]) =>
        `${question} ${answer}`
          .toLowerCase()
          .includes(value)
    );
  }, [query]);

  return (
    <div>
      <label className="relative block">
        <span className="sr-only">
          Search FAQs
        </span>

        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />

        <input
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder="Search questions..."
          className="min-h-13 w-full border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 hover:border-zinc-400 focus:border-brand focus:ring-2 focus:ring-brand/15"
        />
      </label>

      <div className="mt-6 border-l border-t border-zinc-200 bg-white">
        {filtered.map(
          ([question, answer], index) => (
            <details
              key={question}
              className="group border-b border-r border-zinc-200 transition open:bg-[#fafaf8]"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-5 py-5 sm:px-6">
                <div className="flex gap-4">
                  <span className="mt-1 text-[9px] font-black tracking-[.16em] text-brand-dark">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <span className="text-sm font-black leading-6 tracking-[-.015em] text-zinc-950 sm:text-base">
                    {question}
                  </span>
                </div>

                <span className="grid size-8 shrink-0 place-items-center border border-zinc-200 bg-white transition group-open:border-brand group-open:bg-brand">
                  <ChevronDown className="size-4 transition-transform duration-300 group-open:rotate-180" />
                </span>
              </summary>

              <div className="px-5 pb-6 sm:px-6">
                <p className="max-w-3xl pl-0 text-sm leading-7 text-zinc-600 sm:pl-9">
                  {answer}
                </p>
              </div>
            </details>
          )
        )}
      </div>

      {filtered.length === 0 && (
        <div className="border-x border-b border-zinc-200 bg-white px-6 py-10 text-center">
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