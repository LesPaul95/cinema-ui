import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core/';

export const NowPlayingInfoTable = props => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Название</TableCell>
        <TableCell>Описание</TableCell>
        <TableCell>Дата выхода</TableCell>
        <TableCell>Оценка TMDB</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {props.results.map(row => (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {row.title}
          </TableCell>
          <TableCell>{row.overview}</TableCell>
          <TableCell>{row.release_date}</TableCell>
          <TableCell>{row.vote_average}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
