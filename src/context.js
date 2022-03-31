import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { arrDictionary } from './utils';

export const contextt = createContext();

const ContextProvider = ({ children }) => {
  // read excel
  const [itemsExcel, setItemsExcel] = useState([]);
  console.log(itemsExcel);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('tableOrigin'));
    const localFiltered = JSON.parse(localStorage.getItem('tableFiltered'));

    if (localFiltered.length) {
      setItemsExcel(localFiltered);
    } else if (localData) {
      setItemsExcel(localData);
    } else {
      setItemsExcel([]);
    }
  }, []);

  const filteredItems = useCallback((values) => {
    const { height, width, length } = values;

    const ff = JSON.parse(localStorage.getItem('tableOrigin')).filter(
      (el) => height <= el.iheight && width <= el.iwidth && length <= el.ilength
    );
    setItemsExcel(ff);
    localStorage.setItem('tableFiltered', JSON.stringify(ff));
  }, []);

  const readExcel = useCallback(
    (file) => {
      const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
          const bufferArray = e.target.result;
          const wb = XLSX.read(bufferArray, { type: 'buffer' });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);
          data.shift();
          resolve(data);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
      if (!Object.values(formValues)) console.log('excel');
      promise.then((data) => {
        const filtered = data.reduce((acc, item, i) => {
          acc.push(
            Object.values(item).reduce((acc, el, i) => {
              acc[arrDictionary[i]] = el;
              return acc;
            }, {})
          );
          return acc;
        }, []);
        setItemsExcel(filtered);
        localStorage.setItem('tableOrigin', JSON.stringify(filtered));
      });
    },
    [formValues]
  );

  const onChangeFile = useCallback(
    (e) => {
      const file = e.target.files[0];
      readExcel(file);
    },
    [readExcel]
  );
  const [sorted, setSorted] = useState('number');

  const onChangeSort = (e) => {
    setSorted(e.target.value);
  };

  return (
    <contextt.Provider
      value={{
        itemsExcel,
        onChangeFile,
        filteredItems,
        setFormValues,
        setItemsExcel,
        formValues,
        onChangeSort,
        sorted,
      }}
    >
      {children}
    </contextt.Provider>
  );
};

export default ContextProvider;

export const useCustomContext = () => useContext(contextt);
