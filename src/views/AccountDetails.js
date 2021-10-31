import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress, Box, Typography, Container, Button, Divider } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";

import { getTransactions } from "../store/transactions";
import TransactionCard from "../components/TransactionCard";
import TransactionDetailsPopup from "../components/TransactionDetailsPopup";
import consts from "../consts";

const useStyles = makeStyles((theme) => ({
  backButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: "100%"
  }
}));

const AccountDetails = ({accountId}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [selectedTransaction, setSelectedTransaction] = useState();
  const transactions = useSelector(state => state.transactions);

  const handleCardClick = transaction => {
    setSelectedTransaction(transaction);
  }

  const handlePopupClose = () => {
    setSelectedTransaction(null);
  }

  if(!transactions.hasLoaded && !transactions.loading) {
    dispatch(getTransactions(accountId));
  }

  if(transactions.loading) {
    return (
      <LinearProgress color="secondary" />
    );
  } else {
    return (
      <Box m={1}>
        <Container maxWidth="md">
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon/>}
            onClick={() => navigate(consts.overviewPath)}
            className={classes.backButton}
            data-testid="account-details-back-button"
          >
            Back to Account Overview
          </Button>

          {Object.keys(transactions.list).length === 0 ?
            <Typography data-testid="no-transactions">No transactions to show</Typography>
          :
            Object.entries(transactions.list).map(([key, transactionGroup]) => (
              <div key={`div-${key}`}>
                <Typography key={`Typography-${key}`} variant="h4" data-testid={`account-details-month-${key}`}>
                  {key}
                </Typography>
                <Divider key={`Divider-${key}`} />
                {transactionGroup.map(transaction => (
                  <TransactionCard
                    key={transaction.dateTime}
                    type={transaction.type}
                    amount={transaction.amount}
                    accountBalance={transaction.accountBalance}
                    dateTime={transaction.dateTime}
                    title={transaction.title}
                    handleClick={() => handleCardClick(transaction)}
                  />
                ))}
              </div>
            ))
          }

          {selectedTransaction &&
            <TransactionDetailsPopup
              type={selectedTransaction.type}
              dateTime={selectedTransaction.dateTime}
              amount={selectedTransaction.amount}
              accountBalance={selectedTransaction.accountBalance}
              title={selectedTransaction.title}
              reference={selectedTransaction.reference}
              handleClose={handlePopupClose}
            />
          }
        </Container>
      </Box>
    );
  } 
}

AccountDetails.defaultProps = {
  accountId: null
};

AccountDetails.propTypes = {
  accountId: PropTypes.string
};

export default AccountDetails;