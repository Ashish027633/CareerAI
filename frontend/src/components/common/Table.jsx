import React from 'react';

export const Table = ({
  columns = [],
  data = [],
  renderRow,
  keyExtractor,
  emptyMessage = 'No records found',
  className = '',
}) => {
  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-border bg-white shadow-card ${className}`}>
      <table className="w-full text-left text-sm text-slate-text border-collapse">
        <thead className="bg-cream-soft text-xs uppercase font-bold text-slate-muted border-b border-border tracking-wider">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                scope="col"
                className={`py-3.5 px-4 ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'} ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/70 bg-white">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-10 text-center text-slate-muted text-sm"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) =>
              renderRow ? (
                renderRow(item, index)
              ) : (
                <tr
                  key={keyExtractor ? keyExtractor(item) : index}
                  className="hover:bg-cream-soft/60 transition-colors"
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className={`py-3.5 px-4 ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'} ${col.className || ''}`}
                    >
                      {col.render ? col.render(item, index) : item[col.accessor]}
                    </td>
                  ))}
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
