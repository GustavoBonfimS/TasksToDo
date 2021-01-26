import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom'
import { Avatar, Button, CssBaseline, TextField,
  Box, Typography, Container } from '@material-ui/core';
import Copyright from '../components/Copyright';
import { InfoOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import api from '../services/api';
import Alert from '../components/Alert';
import { setUser } from '../services/userService';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.warning.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();

  const [username, setUsername] = useState();
  const [newPassword, setNewPassword] = useState();

  async function handleSubmit(event) {
    event.preventDefault();

    const { data } = await api.put(`/user/${username}`, {
      username: username,
      password: newPassword
    });
    if (data.auth === true) {
      const divR = document.createElement('div');
        document.body.appendChild(divR);

        ReactDOM.render(
          <Alert
            type='success'
            message='Senha alterada com sucesso!'
          />,
          divR
        );
        setUser(data.user);
        history.push('/home');
    } else {
      // show alert
      const divR = document.createElement('div');
        document.body.appendChild(divR);

        ReactDOM.render(
          <Alert
            type='error'
            message='Login ou senha invalidos'
          />,
          divR
        );
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <InfoOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Alterar a senha
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Nome de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Nova senha"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Alterar
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
