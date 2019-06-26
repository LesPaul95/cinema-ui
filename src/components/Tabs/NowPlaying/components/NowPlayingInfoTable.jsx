import * as React from 'react';
import moment from 'moment';
import {
  Table, TableBody, TableCell, TableRow,
} from '@material-ui/core/';

export const NowPlayingInfoTable = props => (
  <Table>
    <TableBody>
      {props.results.map(row => (
        <TableRow key={row.id}>
          <TableCell><img src={`https://image.tmdb.org/t/p/w500${row.poster_path}`} alt="" height="240px" /></TableCell>
          <TableCell component="th" scope="row">
            {row.title}
          </TableCell>
          <TableCell>{row.overview}</TableCell>
          <TableCell>{moment(row.release_date).format('DD.MM.YYYY')}</TableCell>
          <TableCell>{row.vote_average}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
