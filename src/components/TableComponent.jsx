import React, { useState } from 'react';

const TableComponent = ({ data }) => {
  const [columnSelect, setColumnSelect] = useState(null);
  const [rowSelect, setRowSelect] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  if (!Array.isArray(data.data) || data.data.length === 0) {
    return <h2 className='text-2xl'>No data to display! Please upload a CSV file!</h2>;
  }

  const header = data.data[0];
  const rows = data.data.slice(1);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handleColumnSel = (ind) => {
    setColumnSelect(ind);
  };

  const handleRowSel = (ind) => {
    setRowSelect(ind);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ border: '1px solid #aab0bd', margin: 'auto' }}>
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {header.map((header, index) => (
              <th
                onClick={() => handleColumnSel(index)}
                scope="col"
                className={`hover:bg-gray-500 hover:text-white cursor-pointer px-6 py-3 ${columnSelect === index ? 'bg-gray-500 text-white' : ''}`}
                key={index}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, rowIndex) => (
            <tr
              onClick={() => handleRowSel(rowIndex)}
              className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${rowSelect === rowIndex ? 'bg-blue-400 text-white' : ''}`}
              key={rowIndex}
            >
              {row.map((cell, cellIndex) => (
                <td className={`cursor-pointer px-6 py-4 ${columnSelect === cellIndex ? 'bg-blue-500 text-white' : ''}`} key={cellIndex}>
                  <input type="checkbox" checked={rowSelect === rowIndex} onChange={() => handleRowSel(rowIndex)} />
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="bg-gray-200 px-4 py-2 rounded-lg">
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="bg-gray-200 px-4 py-2 rounded-lg">
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
