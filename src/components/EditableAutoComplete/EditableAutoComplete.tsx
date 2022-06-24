import { FC, useState, useEffect } from 'react';
import { OutlinedTextFieldProps, ClickAwayListener, Box, Typography, Paper } from '@mui/material';

import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { EditButton, DetailContainer, DetailValueContainer, TextValue } from './ui';
import { CustomDropdown } from 'components/CustomDropdown';

interface EditableAutoCompleteProps extends Partial<OutlinedTextFieldProps> {
  id: string;
  label: string;
  value: string;
  small?: boolean;
  onSave?: (value: string) => Promise<void>;
}

const EditableAutoComplete: FC<EditableAutoCompleteProps> = ({ id, label, value, small = true, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const onClose = async () => {
    if (!inputValue) {
      setError(true);
      return;
    }

    setEditing(false);

    if (!onSave) return;

    try {
      await onSave(inputValue);
      setSuccess(true);
    } catch (err) {
      // TODO: How should we handle loading and error states if needed
    }
  };

  if (editing) {
    return (
      <ClickAwayListener onClickAway={onClose}>
        <Box position="relative">
          <CustomDropdown<string>
            id="accountType"
            label={label}
            placeholder={`Select the ${label}`}
            value={inputValue}
            options={[]}
            onSelect={(value) => setInputValue(value)}
            InputProps={{
              error,
              onBlur: onClose,
            }}
            PaperComponent={Paper}
          />
        </Box>
      </ClickAwayListener>
    );
  }

  return (
    <DetailContainer>
      <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
        {label}
      </Typography>

      <DetailValueContainer small={small}>
        <TextValue small={small}>{success ? inputValue : value}</TextValue>
        <EditButton
          onClick={() => {
            setEditing(true);
            setSuccess(false);
          }}
          small={small}
          data-testid={`edit-${id}`}
        >
          <EditIcon />
        </EditButton>
      </DetailValueContainer>
    </DetailContainer>
  );
};

export default EditableAutoComplete;
