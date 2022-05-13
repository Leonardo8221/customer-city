import { FC, useState } from 'react';
import { OutlinedTextFieldProps, ClickAwayListener, Box } from '@mui/material';

import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { UserDetail } from 'pages/ControlTower/components/UserDetail';
import { CustomInput } from '../CustomInput';
import { Container, EditButton } from './ui';

interface EditableInputProps extends Partial<OutlinedTextFieldProps> {
  id: string;
  name: string;
  label: string;
  value: string;
  onSave?: () => Promise<void>;
}

const EditableInput: FC<EditableInputProps> = ({ id, name, label, type, value, onSave, ...rest }) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const onClose = async () => {
    setEditing(false);
    if (onSave) {
      try {
        await onSave();
      } catch (error) {
        // TODO: How should we handle loading and error states if needed
      }
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
            onChange={(event) => setInputValue(event.target.value)}
            onBlur={onClose}
            style={{ width: (value.length + 1) * 10, minWidth: 150 }}
          />
        </Box>
      </ClickAwayListener>
    );
  }

  return (
    <Container>
      <UserDetail label={label} value={value} type={type} />
      <EditButton onClick={() => setEditing(true)}>
        <EditIcon />
      </EditButton>
    </Container>
  );
};

export default EditableInput;
