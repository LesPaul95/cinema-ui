import React, { useState, useEffect } from 'react';
import { sortBy } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { getGenresList } from '../../../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 30,
    width: '100%',
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function MultipleGenresList({ selectedGenres, setSelectedGenres }) {
  const classes = useStyles();
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    async function fetchGenres() {
      const { genres: genresResponse } = await getGenresList();
      setGenres(sortBy(genresResponse, ['name']) || []);
    }
    fetchGenres();
  }, []);

  function handleChange(event) {
    setSelectedGenres(event.target.value);
  }

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-checkbox">Жанры</InputLabel>
        <Select
          multiple
          value={selectedGenres}
          onChange={handleChange}
          input={<Input id="select-multiple-checkbox" />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {genres.map(selected => (
            <MenuItem key={selected.name} value={selected.name}>
              <Checkbox checked={selectedGenres.indexOf(selected.name) > -1} />
              <ListItemText primary={selected.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
