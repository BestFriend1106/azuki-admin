import React, { useEffect, useState } from 'react';
import axios from 'utils/axios';
// import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// ==============================|| WalletList PAGE ||============================== //
const WalletListPage = () => {
  const [data, setData] = useState([]);
  const [filtered, setFilteredData] = useState([]);

  function handleChangeKeyword(event) {
    const keyword = event.target.value.toLowerCase();
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].walletAddress !== undefined) {
        temp.push(data[i]);
      }
    }
    const filtered = temp.filter((item) => item.walletAddress.toLowerCase().includes(keyword));
    setFilteredData(filtered);
  }
  const filterWin = (winStatus) => {
    const filtered = data.filter((item) => item.winStatus === winStatus);
    setFilteredData(filtered);
  };
  const handleFilterByDate = async (event) => {
    const dateValue = event;
    const utcDate = dateValue.toLocaleDateString('en-CA');
    const filtered = data.filter((item) => item.date === utcDate);
    setFilteredData(filtered);
  };

  useEffect(() => {
    axios
      .get('https://climb-server.onrender.com/api/spots/all')
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div className="inline-flex mb-5">
        <div className="flex w-[205px] items-center justify-center">
          <div className="text-[20px]">Wallet Address</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-slate-400 rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={handleChangeKeyword}
        ></input>
        <button
          className="rounded-full bg-gray-300 hover:bg-gray-500 ml-3"
          onClick={() => {
            filterWin(1);
          }}
        >
          <div className="mx-[20px]">Win</div>
        </button>
        <button
          className="rounded-full bg-gray-300 hover:bg-gray-500 ml-3"
          onClick={() => {
            filterWin(2);
          }}
        >
          <div className="mx-[20px]">Almost</div>
        </button>
        <button
          className="rounded-full bg-gray-300 hover:bg-gray-500 ml-3 mr-3"
          onClick={() => {
            filterWin(3);
          }}
        >
          <div className="mx-[20px]">Loose</div>
        </button>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker format="dd/MM/yyyy" onChange={(newValue) => handleFilterByDate(newValue)} />
        </LocalizationProvider>
      </div>
      <div className="table w-full text-[15px]">
        {filtered.length != 0 && (
          <div className="table-header-group">
            <div className="table-row">
              <div className="table-cell text-center">No</div>
              <div className="table-cell text-center">Address</div>
              <div className="table-cell text-center">WinStatus</div>
              <div className="table-cell text-center">Date</div>
            </div>
          </div>
        )}

        <div className="table-row-group">
          {filtered.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="table-cell text-center">{index + 1}</div>
              <div className="table-cell text-center">{item.walletAddress}</div>
              <div className="table-cell text-center">{item.winStatus}</div>
              <div className="table-cell text-center">{item.createdAt}</div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default WalletListPage;
