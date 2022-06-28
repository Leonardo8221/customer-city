import { FC, useState } from 'react';
import { OutlinedTextFieldProps, Box, Typography, Paper } from '@mui/material';

import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { ReactComponent as AccountIcon } from 'assets/icons/menuAccounts.svg';
import { ReactComponent as ContactIcon } from 'assets/icons/menuContacts.svg';
import { ReactComponent as DealIcon } from 'assets/icons/menuDeal.svg';
import { EditButton, DetailContainer, DetailValueContainer, TextValue } from './ui';
import { CustomDropdown } from 'components/CustomDropdown';
import { OptionValue } from 'core/types';

type IconType = 'contact' | 'account' | 'deal';

interface EditableAutoCompleteProps extends Partial<OutlinedTextFieldProps> {
  id: string;
  label: string;
  icon?: IconType;
  value: OptionValue<number>;
  small?: boolean;
  options?: OptionValue<number>[];
  onSave?: (value: number) => Promise<void>;
}

const EditableAutoComplete: FC<EditableAutoCompleteProps> = ({
  id,
  label,
  icon,
  value,
  small = true,
  options = [],
  onSave,
}) => {
  const [editing, setEditing] = useState(false);
  // const [inputValue, setInputValue] = useState<OptionValue<number> | null>();

  const onClose = async (inputValue: OptionValue<number> | null) => {
    setEditing(false);

    if (!inputValue || !onSave) return;

    try {
      await onSave(inputValue.value);
    } catch (err) {
      // TODO: How should we handle loading and error states if needed
    }
  };

  if (editing) {
    return (
      <Box position="relative">
        <CustomDropdown<number>
          id={id}
          label={label}
          placeholder={`Select the ${label}`}
          value={value?.value || null}
          options={options}
          onSelect={(value) => {
            onClose(value);
          }}
          InputProps={{
            startAdornment: icon ? (
              <Box display="flex" justifyContent="center" alignItems="center" marginLeft="6px" marginRight="3px">
                {icon === 'account' && <AccountIcon />}
                {icon === 'contact' && <ContactIcon />}
                {icon === 'deal' && <DealIcon />}
              </Box>
            ) : null,
            onBlur: () => onClose(null),
          }}
          PaperComponent={Paper}
        />
      </Box>
    );
  }

  return (
    <DetailContainer>
      <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
        {label}
      </Typography>

      <DetailValueContainer small={small}>
        <TextValue small={small}>
          {icon === 'account' && <AccountIcon />}
          {icon === 'contact' && <ContactIcon />}
          {icon === 'deal' && <DealIcon />}
          {value.label}
        </TextValue>
        <EditButton onClick={() => setEditing(true)} small={small} data-testid={`edit-${id}`}>
          <EditIcon />
        </EditButton>
      </DetailValueContainer>
    </DetailContainer>
  );
};

export default EditableAutoComplete;
