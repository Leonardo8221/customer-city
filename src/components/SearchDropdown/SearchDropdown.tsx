import { FC, useState } from 'react';
import { Box } from '@mui/material';

import { ReactComponent as SearchIcon } from 'assets/icons/searchGray.svg';
import { CustomDropdown } from '../CustomDropdown';

interface SearchDropdownProps {
  id: string;
  placeholder: string;
  label?: string;
}

const SearchDropdown: FC<SearchDropdownProps> = ({ id, placeholder, label }) => {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <CustomDropdown<string>
      id={id}
      label={label}
      placeholder={placeholder}
      value={selectedValue}
      options={[]}
      onSelect={(value) => setSelectedValue(value)}
      labelSx={{ color: 'neutral.main' }}
      withPopupIcon={false}
      InputProps={{
        startAdornment: (
          <Box display="flex" justifyContent="center" alignItems="center" marginLeft="6px" marginRight="3px">
            <SearchIcon />
          </Box>
        ),
      }}
    />
  );
};

export default SearchDropdown;
