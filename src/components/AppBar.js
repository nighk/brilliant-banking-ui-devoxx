import { 
  AppBar as MuiApBar, 
  Toolbar, 
  Typography,
  Button
} from "@material-ui/core";
import { AccountBalance as AccountBalanceIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const AppBar = ({handleLogout}) => {
  const classes = useStyles();

  return (
    <MuiApBar position="static">
      <Toolbar>
        <AccountBalanceIcon className={classes.icon} />
        <Typography variant="h6" className={classes.title}>
          Brilliant Banking
        </Typography>
        {handleLogout && 
          <Button 
            color="inherit"
            onClick={handleLogout}
            data-testid="logout-button"
          >
            Logout
          </Button>
        }
      </Toolbar>
    </MuiApBar>
  );
}

AppBar.defaultProps = {
  handleLogout: null
};

AppBar.propTypes = {
  handleLogout: PropTypes.func
};

export default AppBar;