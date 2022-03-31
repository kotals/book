import { useCustomContext } from '../../context';
import { Header } from '../Header/Header';
import { Table } from './Table';

import styles from './Table.module.css';
export const TableContainer = () => {
  const { itemsExcel } = useCustomContext();

  return (
    <div className={styles.container}>
      <Header/>
      <Table items={itemsExcel} />
    </div>
  );
};
