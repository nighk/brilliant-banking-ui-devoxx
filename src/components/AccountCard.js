import { Card, CardContent, CardActionArea, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  title: {
    fontSize: 14,
  },
  rightText: {
    float: "right"
  }
}));

const AccountCard = ({ handleClick, type, name, balance, interestRate }) => {
  const classes = useStyles();

  return (
    <Card raised position="static" className={classes.card}>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="h5" component="h2" data-testid="account-name">
                {name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" component="h2" className={classes.rightText} data-testid="account-balance">
                <NumberFormat 
                  value={balance} 
                  displayType={"text"} 
                  thousandSeparator={true} 
                  prefix={"£"} 
                  decimalScale={2}
                  fixedDecimalScale
                />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.title} color="textSecondary" gutterBottom data-testid="account-type">
                {type}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={`${classes.title} ${classes.rightText}`} color="textSecondary" gutterBottom data-testid="account-interest">
                {interestRate}% APR
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

AccountCard.propTypes = {
  handleClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  interestRate: PropTypes.number.isRequired
};

export default AccountCard;