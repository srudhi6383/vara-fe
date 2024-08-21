import React from 'react';

const Pagination = ({ rowsPerPage, totalRows, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  };

  const startPage = 1;
  const endPage = totalPages;

  if (totalPages <= 7) {
    pageNumbers.push(...range(startPage, endPage));
  } else {
    if (currentPage <= 4) {
      pageNumbers.push(...range(startPage, 5), '...', totalPages);
    } else if (currentPage >= totalPages - 3) {
      pageNumbers.push(startPage, '...', ...range(totalPages - 4, endPage));
    } else {
      pageNumbers.push(startPage, '...', ...range(currentPage - 2, currentPage + 2), '...', endPage);
    }
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            className="flex items-center justify-center px-3 h-8 leading-tight text-white bg-indigo-600 border border-indigo-600 rounded-l-lg hover:bg-indigo-700 hover:text-white dark:bg-indigo-800 dark:border-indigo-700 dark:text-white"
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            aria-label="Previous Page"
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((number, index) => (
          <li key={index}>
            {number === '...' ? (
              <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                {number}
              </span>
            ) : (
              <button
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  number === currentPage
                    ? 'text-white bg-indigo-600 border border-indigo-600 hover:bg-indigo-700 hover:text-white dark:bg-indigo-800 dark:border-indigo-700 dark:text-white'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
                onClick={() => paginate(number)}
                aria-label={`Page ${number}`}
              >
                {number}
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            className="flex items-center justify-center px-3 h-8 leading-tight text-white bg-indigo-600 border border-indigo-600 rounded-r-lg hover:bg-indigo-700 hover:text-white dark:bg-indigo-800 dark:border-indigo-700 dark:text-white"
            onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
            aria-label="Next Page"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
