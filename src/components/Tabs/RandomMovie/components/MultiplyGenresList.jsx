import React, { useState, useEffect } from 'react';
import { sortBy } from 'lodash';
import {
  Input,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Chip,
} from '@material-ui/core/';
import { getGenresList } from '../../../../actions';

export function MultiplyGenresList({ selectedGenres, handleMultiplyGenresListChange }) {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    async function fetchGenres() {
      const { genres: genresResponse } = await getGenresList();
      setGenres(sortBy(genresResponse, ['name']) || []);
    }
    fetchGenres();
  }, []);

  return (
    <FormControl>
      <InputLabel htmlFor="select-multiple-chip">Жанры</InputLabel>
      <Select
        multiple
        value={selectedGenres}
        onChange={handleMultiplyGenresListChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div>
            {selected.map(value => (
              <Chip key={value} label={value} />
            ))}
          </div>
        )}
      >
        {genres.map(value => (
          <MenuItem key={value.id} value={value.name}>
            {value.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
