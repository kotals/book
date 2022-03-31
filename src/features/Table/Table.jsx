import { Row } from './Row';
import { nanoid } from 'nanoid';
import { Columns } from './Columns';
import { useCustomContext } from '../../context';
export const Table = () => {
  const { itemsExcel, sorted } = useCustomContext();

  return (
    <table className="table">
      <Columns />
      <tbody>
        {itemsExcel
          .sort((a, b) => a[sorted] - b[sorted])
          .map((item, i) => {
            return <Row key={nanoid()} item={item} />;
          })}
      </tbody>
    </table>
  );
};
