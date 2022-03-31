import { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useCustomContext } from '../../context';
import { Form } from '../Form/Form';

export const Header = () => {
  const { onChangeFile, setItemsExcel, onChangeSort } = useCustomContext();

  const onResetData = useCallback(() => {
    const data = JSON.parse(localStorage.getItem('tableOrigin'));
    localStorage.setItem('tableFiltered', JSON.stringify([]));
    setItemsExcel(data);
  }, [setItemsExcel]);

  return (
    <>
      <div
        className="input-group mb-3"
        style={{
          width: '300px',
        }}
      ></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ width: '250px', marginTop: '-11px' }}>
          <label>Сортировать:</label>
          <select
            className="form-select form-select "
            style={{ width: '170px' }}
            aria-label=".form-select-lg example"
            onChange={onChangeSort}
            name="select"
            defaultValue="number"
          >
            <option value="number" selected>
              по умолчанию
            </option>
            <option value="ilength">по длине</option>
            <option value="iwidth">по ширине</option>
            <option value="iheight">по высоте</option>
          </select>
        </div>
        <div style={{ width: '250px', position: 'relative' }}>
          <Form />
          <Button
            className="m-2"
            style={{ position: 'absolute', top: 0, right: '50px' }}
            variant="dark"
            onClick={onResetData}
          >
            X
          </Button>
        </div>
        <div style={{ width: '250px' }}>
          <input type="file" onChange={onChangeFile} className="form-control" />
        </div>
      </div>
    </>
  );
};
