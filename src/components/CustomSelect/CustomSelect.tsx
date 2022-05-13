import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';

import { Select, OptionItem } from './ui';

type OptionValue = string | number;

interface Option<T extends OptionValue> {
  label: string;
  value: T;
}

interface CustomSelectProps<T extends OptionValue> {
  value: T;
  options: Option<T>[];
  onSelect?: (value: T) => void;
  small?: boolean;
}

const CustomSelect = <T extends OptionValue>({
  value,
  options,
  onSelect,
  small,
}: CustomSelectProps<T>): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState<T>(value);

  const onChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedValue(event.target.value as T);
    if (onSelect) onSelect(event.target.value as T);
  };

  const selectedOption = options.find((option) => option.value === selectedValue);

  return (
    <Select
      value={selectedOption?.value ?? ''}
      label={selectedOption?.label ?? ''}
      onChange={onChange}
      MenuProps={{
        PaperProps: {
          style: {
            boxShadow: '0px 4px 24px rgba(23, 46, 82, 0.08)',
            borderRadius: '4px',
          },
        },
      }}
      small={small}
      sx={{ width: 'fit-content' }}
    >
      {options.map((option) => (
        <OptionItem key={option.value} value={option.value} small={small}>
          {option.label}
        </OptionItem>
      ))}
    </Select>
  );
};

export default CustomSelect;
