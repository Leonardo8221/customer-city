import { Autocomplete, TextField, InputLabel, SxProps, Theme, InputProps } from '@mui/material';

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
  labelSx?: SxProps<Theme>;
  withPopupIcon?: boolean;
  InputProps?: Partial<InputProps>;
  onSelect: (value: T) => void;
}

const CustomDropdown = <T extends OptionValue>({
  value,
  options,
  placeholder,
  id,
  label,
  labelSx = {},
  withPopupIcon = true,
  onSelect,
  InputProps,
}: CustomDropdownProps<T>): JSX.Element => {
  return (
    <div>
      {label && (
        <InputLabel htmlFor={id} sx={{ marginBottom: 1, ...labelSx }}>
          {label}
        </InputLabel>
      )}

      <Autocomplete
        disablePortal
        id={id}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            placeholder={placeholder}
            InputProps={{ ...params.InputProps, ...InputProps }}
          />
        )}
        disableClearable
        PaperComponent={Paper}
        ListboxProps={{ style: { maxHeight: 300 } }}
        value={options.find((options) => options.value === value)}
        onChange={(e, value) => onSelect(value.value)}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        popupIcon={withPopupIcon ? <TraingleDownIcon /> : null}
      />
    </div>
  );
};

export default CustomDropdown;
