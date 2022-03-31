import React from 'react';
import { useCustomContext } from '../../context';

export const Row = ({ item: row }) => {
  const {
    number,
    type,
    status,
    load,
    color,
    ilength,
    iwidth,
    iheight,
    olength,
    owidth,
    oheight,
    volume,
    weight,
  } = row;

  const { sorted } = useCustomContext();
  console.log();
  console.log(sorted === ilength);
  return (
    <tr>
      <th scope="row">{number}</th>
      <td>{type}</td>
      <td>{status}</td>
      <td>{load}</td>
      <td>{color}</td>
      <td style={{ color: sorted === 'ilength' ? '#847D7D' : '' }}>{ilength}</td>
      <td style={{ color: sorted === 'iwidth' ? '#847D7D' : '' }}>{iwidth}</td>
      <td style={{ color: sorted === 'iheight' ? '#847D7D' : '' }}>{iheight}</td>
      <td>{olength}</td>
      <td>{owidth}</td>
      <td>{oheight}</td>
      <td>{volume}</td>
      <td>{weight}</td>
    </tr>
  );
};
