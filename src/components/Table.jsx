import React, { useState } from 'react';

const TableComponent = ({ data }) => {
  const [columnSelect, setColumnSelect] = useState(null);
  const [rowSelect, setRowSelect] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  if (!Array.isArray(data) || data.length === 0) {
    return <h2 className='text-2xl'>No data to display! Please upload a CSV file!</h2>;
  }

  const header = data[0];
  const rows = data.slice(1);

  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = rows.slice(startIndex, endIndex);

  const handleColumnSel = (ind) => {
    setColumnSelect(ind);
  };

  const handleRowSel = (ind) => {
    setRowSelect(ind);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table
        className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'
        style={{ border: '1px solid #a1a2a4', margin: 'auto' }}
      >
        <thead className='text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            {header.map((headerItem, index) => (
              <th
                key={index}
                onClick={() => handleColumnSel(index)}
                scope='col'
                className={`hover:bg-gray-500 hover:text-white cursor-pointer px-6 py-3 ${columnSelect === index ? 'bg-gray-500 text-white' : ''}`}
              >
                {headerItem}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => handleRowSel(rowIndex)}
              className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${rowSelect === rowIndex ? 'bg-yellow-400 text-white' : ''}`}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`cursor-pointer px-6 py-4 ${columnSelect === cellIndex ? 'bg-yellow-500 text-white' : ''}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ width: '30%', margin: 'auto', marginTop: '10px', marginBottom: '20px' }} className='flex justify-between items-center'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-300'
        >
          Previous
        </button>
        <span className='text-sm'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-300'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
