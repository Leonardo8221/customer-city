import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useToggle } from 'utils/toggle';

export default function AddResource() {
  const { toggle, flag } = useToggle();

  const onAdd = () => {
    toggle();
    return null;
  };

  return (
    <>
      <Button fullWidth variant="contained" onClick={onAdd} color="primary">
        {' '}
        Add Resource
      </Button>
    </>
  );
}
