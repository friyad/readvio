"use client";

import { useMemo, useState } from "react";
import TableFooter from "./TableFooter";
import TextInput from "@/components/ui/input-text";
import { SearchIcon } from "lucide-react";
import { formatDateForDisplay } from "@/utils/date";

interface ReferredUsersTableProps {
  referredUsers: {
    name: string;
    email: string;
    referredOn: string;
    isConverted: boolean;
    credits: number;
  }[];
}

const ReferredUsersTable = ({ referredUsers }: ReferredUsersTableProps) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const data = !q
      ? referredUsers
      : referredUsers.filter((r) =>
          [r.name, r.email].some((v) => v.toLowerCase().includes(q))
        );
    return data;
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className=" ">
      {/* Table Header */}
      <div className="flex items-center justify-start gap-2 relative mb-4 max-w-md">
        <SearchIcon className="size-4 text-primary-blue absolute left-3 top-1/2 -translate-y-1/2" />
        <TextInput
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search by name or email"
          inputClassName="w-full pl-10"
        />
      </div>

      <div className="rounded-xl border border-accent-blue/20 bg-white shadow-sm">
        <div className="w-full overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-accent-blue/20 bg-clean-white/60 text-primary-blue">
              <tr className="table-row">
                <th className="px-2.5 lg:px-5 py-3">Name</th>
                <th className="px-2.5 lg:px-5 py-3">Email</th>
                <th className="px-2.5 lg:px-5 py-3">Joined</th>
                <th className="px-2.5 lg:px-5 py-3">Converted</th>
                <th className="px-2.5 lg:px-5 py-3">Credits</th>
              </tr>
            </thead>
            <tbody className="">
              {pageData.map((u) => (
                <tr
                  key={u.email}
                  className="border-b border-accent-blue/10 table-row"
                >
                  <td className="px-2.5 lg:px-5 py-3 whitespace-nowrap">
                    {u.name}
                  </td>
                  <td className="px-2.5 lg:px-5 py-3 text-primary-blue/70">
                    {u.email}
                  </td>
                  <td className="px-2.5 lg:px-5 py-3">
                    {formatDateForDisplay(u.referredOn)}
                  </td>
                  <td className="px-2.5 lg:px-5 py-3">
                    {u.isConverted ? "Yes" : "No"}
                  </td>
                  <td className="px-2.5 lg:px-5 py-3">{u.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TableFooter
          totalPages={totalPages}
          currentPage={page}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default ReferredUsersTable;
