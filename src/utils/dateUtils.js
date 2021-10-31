import moment from "moment";

export const sortTransactionsByDate = transactions =>
  transactions.sort((a, b) => moment(a.dateTime).isBefore(b.dateTime) ? 1 : -1);

export const groupTransactionsByMonth = transactions => {
  const groupedTransactions = transactions.reduce((accumulator, elem) => {
    const month = moment(elem.dateTime).format("MMM");

    if (!accumulator[month]) {
      accumulator[month] = [];
    }

    accumulator[month].push(elem);
    return accumulator;
  }, {});

  return groupedTransactions;
}