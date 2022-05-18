import { ChangeEvent, FC } from 'react';
import { Box } from '@mui/material';

import { ReactComponent as SearchIcon } from 'assets/icons/searchGray.svg';
import { OptionValue } from 'core/types';
import { CustomDropdown } from '../CustomDropdown';

interface SearchDropdownProps {
  id: string;
  placeholder: string;
  label?: string;
  options?: OptionValue<string>[];
  onSelect: (selectedValue: string) => void;
  onChange: (value: string) => void;
}

const SearchDropdown: FC<SearchDropdownProps> = ({ id, placeholder, label, options = [], onSelect, onChange }) => {
  return (
    <CustomDropdown<string>
      id={id}
      label={label}
      placeholder={placeholder}
      value=""
      options={options}
      onSelect={(value) => onSelect(value)}
      labelSx={{ color: 'neutral.main' }}
      withPopupIcon={false}
      InputProps={{
        startAdornment: (
          <Box display="flex" justifyContent="center" alignItems="center" marginLeft="6px" marginRight="3px">
            <SearchIcon />
          </Box>
        ),
        onChange: (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value),
      }}
      disableClearable={false}
    />
  );
};

export default SearchDropdown;
