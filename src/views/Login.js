import { useState } from "react";
import { TextField, Button, Box, Container } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { login } from "../store/user";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: `${theme.spacing(1)}px 0px ${theme.spacing(1)}px 0px`,
      width: "100%"
    }
  },
  button: {
    marginTop: theme.spacing(2),
    width: "100%"
  }
}));

const Login = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const errorMessage = useSelector(state => state.user.errorMessage);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login({
      username,
      password
    }));
  }

  return (
    <Box m={3} className={classes.root}>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <div>
            <TextField 
              required 
              label="Username" 
              value={username} 
              onChange={(event) => setUsername(event.target.value)}
              data-testid="login-username"
            />
          </div>

          <div>
            <TextField 
              required 
              label="Password" 
              value={password} 
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              data-testid="login-password"
            />
          </div>

          {errorMessage && <Alert severity="error" data-testid="login-error">{errorMessage}</Alert>}
          
          <div>
            <Button 
              variant="contained" 
              color="primary" 
              className={classes.button}  
              type="submit"
              data-testid="login-button"
            >
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </Box>
  )
}

export default Login;