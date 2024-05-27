import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Box, Typography } from '@mui/material';
import { addPaymentAccount, getPaymentAddress } from '../../features/payments/paymentAccountSlice';

const PaymentAccount = () => {
  const dispatch = useDispatch();
  const [inputAccountNumber, setInputAccountNumber] = useState('');
  const accountNumber = useSelector((state) => state.paymentAccount.accountNumber);
  const paymentAddress = useSelector((state) => state.paymentAccount.paymentAddress);
  const status = useSelector((state) => state.paymentAccount.status);
  const error = useSelector((state) => state.paymentAccount.error);

  useEffect(() => {
    dispatch(getPaymentAddress());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      setInputAccountNumber('');
    }
  }, [status]);

  const handleInputChange = (e) => {
    setInputAccountNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPaymentAccount(inputAccountNumber));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '90vh',
        paddingLeft: '400px',
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          mx: 'auto',
          p: 3,
          backgroundColor: '#ffffff',
          border: 'solid 0.5px',
          borderRadius: 15,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Add Payment Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Account Number"
            value={inputAccountNumber}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 3 }}>
            Add Account
          </Button>
        </form>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'succeeded' && <p>Account added successfully!</p>}
        {status === 'failed' && <p style={{ color: 'red' }}>Error: {error}</p>}

        {/* Dòng hiển thị thông tin Current Account */}
        <Box
          sx={{
            marginTop: 2,
            padding: 1,
            borderRadius: 3,
            backgroundColor: '#f9f9f9',
            marginTop: 5,
          }}
        >
          <Typography variant="h5" component="h2">
            Current Account
          </Typography>
          <Typography variant="body1">
            {paymentAddress ? `Payment Address: ${paymentAddress}` : 'Loading payment address...'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentAccount;
