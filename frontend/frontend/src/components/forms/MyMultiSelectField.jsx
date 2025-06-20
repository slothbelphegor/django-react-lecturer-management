import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import { Controller } from 'react-hook-form'

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

export default function MyMultiSelectField(props) {
  const { label, name, control, options, disabled,
    onChange: customOnChange, selectedValues } = props
  


  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error }
      }) => (
        <div>
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
            <Select
              disabled={disabled}
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={selectedValues !== undefined ? selectedValues : value}
              onChange={(e) => {
                onChange(e); // Update form state
                if (customOnChange) customOnChange(e); // Call custom handler if provided
              }}
              onBlur={onBlur}
              error={!!error}
              input={<OutlinedInput id="select-multiple-chip" label={label} />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={options.find(option => option.id === value)?.name} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {options.map((option) => (
                <MenuItem
                  key={option.id}
                  value={option.id}
                >
                  {option.name}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        </div>
      )}
    />

  );
}
