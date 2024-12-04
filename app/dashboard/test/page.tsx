"use client"

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../loading';

type SheetData = string[][];

export default function Page() {
  const [data, setData] = useState<SheetData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sheets');
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch data: ${response.statusText} - ${errorText}`);
        }
        const result = await response.json();
        setData(result);
        toast.success('Data fetched successfully!', { position: 'top-right', className: 'bg-green-500 text-white' });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        toast.error(`Error: ${errorMessage}`, { position: 'top-right', className: 'bg-red-500 text-white' });
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto ">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Google Sheets Data</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead>
          <tr className="bg-gray-100">
            {data[0]?.map((header, index) => (
              <th key={index} className="border border-gray-300 px-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
