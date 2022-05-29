import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function FreeSolo({ data, label, onKeyDown }) {
  return (
    <Autocomplete
      freeSolo
      id='free-solo-2-demo'
      disableClearable
      options={data}
      onKeyDown={onKeyDown}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
        />
      )}
    />
  );
}
