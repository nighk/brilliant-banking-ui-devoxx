import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress, Box, Typography, Container, Button, Divider } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";

import { getTransactions } from "../store/transactions";
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
  const transactions = useSelector(state => state.transactions);

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

          {/* TODO */}
          <Typography data-testid="no-transactions">Replace Me!</Typography>
  
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