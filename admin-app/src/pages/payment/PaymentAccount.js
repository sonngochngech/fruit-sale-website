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
        minHeight: '90vh',
        paddingLeft:'400px',
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          mx: 'auto',
          p: 3,
          backgroundColor: '#ffffff',
          border:'solid 0.5px',
          borderRadius: 15,
          // boxShadow: 1,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom >
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
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{marginTop: 3}}>
            Add Account
          </Button>
        </form>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'succeeded' && <p>Account added successfully!</p>}
        {status === 'failed' && <p style={{color:'red'}}>Error: {error}</p>}
        
        {/* Dòng hiển thị thông tin Current Account */}
        <Box
          sx={{
            marginTop: 2,
            padding: 1,
            borderRadius: 3,
            backgroundColor: '#f9f9f9',
            marginTop: 5,
            // boxShadow: 1,
          }}
        >
          <Typography variant="h5" component="h2">
            Current Account
          </Typography>
          <Typography variant="body1">
            {accountNumber || 'No account number entered yet.'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentAccount;
