import React, { useState } from 'react';
import { Alert } from '@material-ui/lab';
import { Snackbar, Slide } from '@material-ui/core';

export default function AlertMessage(props) {
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={() => setOpen(false)}
      TransitionComponent={Slide}
    >
      <Alert severity={props.type}>{props.message}</Alert>
    </Snackbar>
  );
}
