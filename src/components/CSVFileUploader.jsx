import React, { useState } from 'react';
import Papa from "papaparse";
import TableComponent from './Table';
import Pagination from './Pagination';

const CSVFileUploader = () => {
  const [data, setData] = useState([]);
  const [columnKeys, setColumnKeys] = useState([]);
  const [values, setValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [rowsPerPage] = useState(10); 

  const handleFileUpload = (e) =>{
    const file = e.target.files[0];

    if (!file) {
      alert("No file selected. Please choose a CSV file.");
      return;
    }
    if (file && file.type !== "text/csv") {
      alert("Please upload a valid CSV file.");
      return;
    }
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function(result) {
        let columnArray = [];
        let valuesArray = [];

        result.data.forEach((el, index) => {
          const uniqueId = `${Date.now()}-${index}`;
          valuesArray.push({ id: uniqueId, data: Object.values(el) });
          columnArray = Object.keys(el);
        });
        setColumnKeys(columnArray); 
        setValues(valuesArray);
        setData(result.data);
      }
    });
  }

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentValues = values.slice(indexOfFirstRow, indexOfLastRow);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='w-[90%] m-auto p-1'>
      <div className='bg-purple-200 rounded-md w-[80%] md:w-[50%] h-[85px] m-auto mt-[15px] mb-3 flex justify-center items-center' >
        <input type="file" accept='.csv' onChange={handleFileUpload} className="text-gray-800" />
      </div>
      <TableComponent columnKeys={columnKeys} values={currentValues} />
      {data.length > 0 && (
        <Pagination 
          rowsPerPage={rowsPerPage}
          totalRows={values.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}

export default CSVFileUploader;
