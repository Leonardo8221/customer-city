import { Autocomplete, TextField, InputLabel } from '@mui/material';

import { ReactComponent as TraingleDownIcon } from 'assets/icons/triangleDown.svg';
import { Paper } from './ui';

type OptionValue = string | number;

interface Option<T extends OptionValue> {
  label: string;
  value: T;
}

interface CustomDropdownProps<T extends OptionValue> {
  value: T | null;
  options: Option<T>[];
  placeholder: string;
  id: string;
  label?: string;
  onSelect: (value: T) => void;
}

const CustomDropdown = <T extends OptionValue>({
  value,
  options,
  placeholder,
  id,
  label,
  onSelect,
}: CustomDropdownProps<T>): JSX.Element => {
  return (
    <>
      {label && (
        <InputLabel htmlFor={id} sx={{ marginBottom: 1 }}>
          {label}
        </InputLabel>
      )}

      <Autocomplete
        disablePortal
        id={id}
        options={options}
        renderInput={(params) => <TextField {...params} fullWidth placeholder={placeholder} />}
        disableClearable
        PaperComponent={Paper}
        ListboxProps={{ style: { maxHeight: 300 } }}
        value={options.find((options) => options.value === value)}
        onChange={(e, value) => onSelect(value.value)}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        popupIcon={<TraingleDownIcon />}
      />
    </>
  );
};

export default CustomDropdown;
