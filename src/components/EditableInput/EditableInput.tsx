import { FC, useState, ChangeEvent } from 'react';
import { OutlinedTextFieldProps, ClickAwayListener, Box } from '@mui/material';

import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { UserDetail } from '../UserDetail';
import { CustomInput } from '../CustomInput';
import { Container, EditButton } from './ui';

interface EditableInputProps extends Partial<OutlinedTextFieldProps> {
  id: string;
  name: string;
  label: string;
  value: string;
  small?: boolean;
  onSave?: () => Promise<void>;
}

const EditableInput: FC<EditableInputProps> = ({ id, name, label, type, value, small = true, onSave, ...rest }) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!inputValue) setError(false);
    setInputValue(event.target.value);
  };

  const onClose = async () => {
    if (!inputValue) {
      setError(true);
      return;
    }

    setEditing(false);

    if (!onSave) return;

    try {
      await onSave();
    } catch (err) {
      // TODO: How should we handle loading and error states if needed
    }
  };

  if (editing) {
    return (
      <ClickAwayListener onClickAway={onClose}>
        <Box position="relative" width="fit-content">
          <CustomInput
            id={id}
            name={name}
            label={label}
            type={type}
            {...rest}
            value={inputValue}
            onChange={onChange}
            onBlur={onClose}
            style={{ width: (value.length + 1) * 10, minWidth: 150 }}
            error={error}
          />
        </Box>
      </ClickAwayListener>
    );
  }

  return (
    <Container small={small}>
      <UserDetail label={label} value={value} type={type} small={small} />

      <EditButton onClick={() => setEditing(true)} small={small}>
        <EditIcon />
      </EditButton>
    </Container>
  );
};

export default EditableInput;
