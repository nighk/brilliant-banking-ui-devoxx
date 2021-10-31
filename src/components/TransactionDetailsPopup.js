import { Typography, Grid, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red, lightGreen } from "@material-ui/core/colors";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  moneyIn: {
    color: lightGreen["A700"],
  },
  moneyOut: {
    color: red[900],
  }
}));

const TransactionCard = ({ handleClose, type, dateTime, amount, accountBalance, title, reference }) => {
  const classes = useStyles();

  return (
    <Dialog onClose={handleClose} open={true}>
      <DialogTitle data-testid="transaction-title">{title}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography color="textSecondary">
              Reference:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography data-testid="transaction-reference">
              {reference}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="textSecondary">
              Amount:
            </Typography>
          </Grid>
          <Grid item xs={6}> 
            <Typography data-testid="transaction-amount">
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
            <Typography color="textSecondary">
              Resulting Balance:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography data-testid="transaction-balance">
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
          <Grid item xs={6}>
            <Typography color="textSecondary">
              Date:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography data-testid="transaction-date-time">
              <Moment format="D MMM YYYY @ HH:mm">{dateTime}</Moment>
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

TransactionCard.propTypes = {
  type: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  accountBalance: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  reference: PropTypes.string.isRequired
};

export default TransactionCard;