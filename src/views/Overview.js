import { useDispatch, useSelector } from "react-redux";
import { LinearProgress, Box, Typography, Container } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { navigate } from "@reach/router";

import { clearTransactions } from "../store/transactions";
import { getAccounts } from "../store/accounts";
import AccountCard from "../components/AccountCard";
import consts from "../consts";

const Overview = () => {
  const dispatch = useDispatch();
  const accounts = useSelector(state => state.accounts);

  const handleCardClick = accountId => {
    // ensure transactions are cleared to prompt loading the on the next page
    dispatch(clearTransactions()); 
    navigate(`${consts.accountDetailsPath}/${accountId}`);
  }

  if(!accounts.hasLoaded && !accounts.loading && !accounts.error) {
    dispatch(getAccounts());
  }

  if(accounts.loading) {
    return (
      <LinearProgress color="secondary" />
    );
  } else {
    return (
      <Box m={1}>
        <Container maxWidth="md">
          {accounts.error ?
            <Alert severity="error">
              The following server error occurred when loading the account info: 
              <br/><br/>
              {accounts.error}
              <br/><br/>
              Please refresh the page to try again.
            </Alert>
          :
            <>
              {Object.keys(accounts.list).length === 0 ?
                <Typography data-testid="no-accounts">No accounts to show</Typography>
              :
                Object.entries(accounts.list).map(([key, account]) => (
                  <AccountCard
                    key={key}
                    handleClick={() => handleCardClick(key)}
                    type={account.type}
                    name={account.name}
                    balance={account.balance}
                    interestRate={account.interestRate}
                  />
                ))
              }
            </>
          }
        </Container>
      </Box>
    );
  } 
}

export default Overview;