import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import Copyright from "../components/Copyright";
import { AddCircleOutline } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import api from "../services/api";
import Alert from "../components/Alert";
import { setUser } from "../services/userService";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateUser() {
  const classes = useStyles();
  const history = useHistory();

  const [username, setUsername] = useState();
  const [password, setPasswrd] = useState();

  async function handleSubmit(event) {
    event.preventDefault();

    const { data } = await api.post(`/user`, {
      username: username,
      password: password,
    });
    if (data.auth === true) {
      setUser(data.user);
      history.push("/home");
    } else {
      // show alert
      const divR = document.createElement("div");
      document.body.appendChild(divR);

      ReactDOM.render(
        <Alert type="error" message="Erro ao cadastrar usuario" />,
        divR
      );
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddCircleOutline />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastrar usuário
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Nome de usuário"
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
            onChange={(e) => setPasswrd(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Cadastrar
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
