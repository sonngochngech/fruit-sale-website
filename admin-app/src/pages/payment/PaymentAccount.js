import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Box, Typography } from '@mui/material';
import { setAccountNumber, addPaymentAccount } from '../../features/payments/paymentAccountSlice';

const PaymentAccount = () => {
  const dispatch = useDispatch();
  const accountNumber = useSelector((state) => state.paymentAccount.accountNumber);
  const status = useSelector((state) => state.paymentAccount.status);
  const error = useSelector((state) => state.paymentAccount.error);

  const handleInputChange = (e) => {
    dispatch(setAccountNumber(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPaymentAccount(accountNumber));
  };

  return (
    <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // minHeight: '100vh',
      // paddingLeft:'400px'
    }}
  >
    <Box
      sx={{
        maxWidth: 400,
        width: '100%',
        mx: 'auto',
        p: 3,
        backgroundColor: '#fffff',
        borderRadius: 15,
        boxShadow: 1,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Add Payment Account
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Account Number"
          value={accountNumber}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Account
        </Button>
      </form>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && <p>Account added successfully!</p>}
      {status === 'failed' && <p>Error: {error}</p>}
    </Box>
  </Box>
    );
  };
  

export default PaymentAccount;
