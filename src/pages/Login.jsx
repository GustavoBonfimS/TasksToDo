import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Avatar, Button, CssBaseline, TextField, Link,
  Grid, Box, Typography, Container } from '@material-ui/core';
import Copyright from '../components/Copyright';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'

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
    backgroundColor: theme.palette.secondary.main,
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
  const [password, setPassword] = useState();

  async function handleSubmit(event) {
    event.preventDefault();

    const { data } = await api.post('/user/login', {
      username: username,
      password: password
    });
    if (data.auth === true) {
      setUser(data.user);
      history.push('/home')
    } else {
      // show alert
      const divR = document.createElement('div');
        document.body.appendChild(divR);

        ReactDOM.render(
          <Alert
            type='error'
            message='Login ou senha incorretos'
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Fazer login
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
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forget" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/create" variant="body2">
                {"Não tem uma conta? Cadastre-se!"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
