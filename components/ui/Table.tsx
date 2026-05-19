import { titleCase } from "@/lib/format";

export function DataTable({
  rows,
  columns,
  maxRows = 12,
}: {
  rows: Record<string, unknown>[];
  columns?: string[];
  maxRows?: number;
}) {
  const keys = columns ?? Object.keys(rows[0] ?? {});
  const visibleRows = rows.slice(0, maxRows);

  if (rows.length === 0 || keys.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
        Data belum tersedia.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="table-scrollbar overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              {keys.map((key) => (
                <th
                  key={key}
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  {titleCase(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visibleRows.map((row, index) => (
              <tr key={index} className="hover:bg-cyan-50/40">
                {keys.map((key) => (
                  <td key={key} className="max-w-[22rem] whitespace-normal px-4 py-3 text-slate-700">
                    {String(row[key] ?? "-")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length > maxRows ? (
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-500">
          Menampilkan {maxRows} dari {rows.length} baris. File lengkap tersedia di folder public/data.
        </div>
      ) : null}
    </div>
  );
}
