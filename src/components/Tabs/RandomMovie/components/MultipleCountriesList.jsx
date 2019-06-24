import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { LANGUAGE_CODES } from '../constants';

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

export function MultipleCountriesList({ selectedCountries, setSelectedCountries }) {
  const classes = useStyles();

  function handleChange(event) {
    setSelectedCountries(event.target.value);
  }

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-checkbox">Страна</InputLabel>
        <Select
          multiple
          value={selectedCountries}
          onChange={handleChange}
          input={<Input id="select-multiple-checkbox" />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {LANGUAGE_CODES.map(lCode => (
            <MenuItem key={lCode.english_name} value={lCode.english_name}>
              <Checkbox
                checked={selectedCountries.indexOf(lCode.english_name) > -1}
              />
              <ListItemText primary={lCode.english_name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
