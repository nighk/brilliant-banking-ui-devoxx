import { Card, CardContent, Typography, Grid, CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red, lightGreen } from "@material-ui/core/colors";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import Moment from "react-moment";

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
  },
  moneyIn: {
    color: lightGreen["A700"],
  },
  moneyOut: {
    color: red[900],
  }
}));

const TransactionCard = ({ type, amount, accountBalance, title, dateTime, handleClick }) => {
  const classes = useStyles();

  return (
    <Card raised position="static" className={classes.card}>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <Typography variant="h5" component="h2" data-testid="transaction-title">
                {title}
              </Typography>
            </Grid>
            <Grid item xs={6}> 
              <Typography variant="h5" component="h2" className={classes.rightText} data-testid="transaction-amount">
                <NumberFormat 
                  className={type === "in" ? classes.moneyIn : classes.moneyOut}
                  value={amount} 
                  displayType={"text"} 
                  thousandSeparator={true} 
                  prefix={"£"} 
                  decimalScale={2}
                  fixedDecimalScale
                />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.title} color="textSecondary"  data-testid="transaction-date-time">
                <Moment format="D MMM YYYY @ HH:mm">{dateTime}</Moment>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={`${classes.title} ${classes.rightText}`} color="textSecondary"  data-testid="transaction-balance">
                <NumberFormat 
                  value={accountBalance} 
                  displayType={"text"} 
                  thousandSeparator={true} 
                  prefix={"£"} 
                  decimalScale={2}
                  fixedDecimalScale
                />
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

TransactionCard.propTypes = {
  type: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  accountBalance: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default TransactionCard;