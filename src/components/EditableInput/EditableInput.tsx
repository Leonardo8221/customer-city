import { FC, useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
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
  onSave?: (value: string) => Promise<void>;
}

const EditableInput: FC<EditableInputProps> = ({ id, name, label, type, value, small = true, onSave, ...rest }) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

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
      await onSave(inputValue);
      setSuccess(true);
    } catch (err) {
      // TODO: How should we handle loading and error states if needed
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onClose();
    }
  };

  if (editing) {
    return (
      <ClickAwayListener onClickAway={onClose}>
        <Box position="relative">
          <CustomInput
            id={id}
            name={name}
            label={label}
            type={type}
            {...rest}
            value={inputValue}
            onChange={onChange}
            onBlur={onClose}
            error={error}
            onKeyDown={onKeyDown}
          />
        </Box>
      </ClickAwayListener>
    );
  }

  return (
    <Container small={small}>
      <UserDetail label={label} value={success ? inputValue : value} type={type} small={small} />

      <EditButton
        onClick={() => {
          setEditing(true);
          setSuccess(false);
        }}
        small={small}
      >
        <EditIcon />
      </EditButton>
    </Container>
  );
};

export default EditableInput;
