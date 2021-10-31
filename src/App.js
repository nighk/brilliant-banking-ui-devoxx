import { Router } from "@reach/router";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "@reach/router";

import Login from "./views/Login";
import Overview from "./views/Overview";
import AccountDetails from "./views/AccountDetails";
import consts from "./consts";
import { checkLogin, logout } from "./store/user";
import AppBar from "./components/AppBar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d32f2f",
    },
    secondary: {
      main: "#5c6bc0",
    },
  },
});

const App = () => {
  const dispatch = useDispatch();
  const { username } = useSelector(state => state.user);
  const location = useLocation();

  if(location.pathname !== consts.loginPath && !username) {
    dispatch(checkLogin());
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar handleLogout={username ? () => dispatch(logout()) : undefined} />
      <Router>
        <Login path={consts.loginPath} />
        {username &&
          <>
            <Overview path={consts.overviewPath} />
            <AccountDetails path={`${consts.accountDetailsPath}/:accountId`} />
          </>
        }
      </Router>
    </ThemeProvider>
  );
}

export default App;