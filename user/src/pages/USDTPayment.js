import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import USDTABI from "../abi/ERC20.json";
import { useDispatch, useSelector } from "react-redux";
import { getAddress, getAnUserSpecificOrder,pay } from "../features/users/userSlice";
import { toast } from 'react-toastify';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const USDTAddress = "0xDF8fC8CcC3830D5Cd4699A72ABd06a2c9506fcA9";
// const recipient = "0x595622cBd0Fc4727DF476a1172AdA30A9dDf8F43";

const BNBPayment = () => {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const location = useLocation();
  const orderId = location.pathname.split('/')[2];
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();
  const navigate=useNavigate();
  const orderState = useSelector((state) => state?.auth?.order);
  const recipient= useSelector((state)=>state?.auth?.paymentAddress);

  useEffect(() => {
    dispatch(getAddress());
    dispatch(getAnUserSpecificOrder(orderId));
  }, []);

  
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      setIsConnected(true);
    } else {
      setAccount(null);
      setIsConnected(false);
      toast.error("Please connect to MetaMask.");
    }
  };

  // Request account access if needed
  const requestAccount = async () => {
    try {
      if (window.ethereum) {
        // Connect to the desired network
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x61", // Chain ID of the desired network
              chainName: "BSC testnet", // Name of the network
              nativeCurrency: {
                name: "Binance Coin",
                symbol: "tBNB",
                decimals: 18,
              },
              rpcUrls: ["https://data-seed-prebsc-1-s1.bnbchain.org:8545"], // Provider URL
              blockExplorerUrls: ["https://testnet.bscscan.com"], // Explorer URL
            },
          ],
        });

        // Request account after connecting to the network
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        handleAccountsChanged(accounts);
      } else {
        toast.error("MetaMask is not installed!");
      }
    } catch (error) {
      toast.error("Error connecting to network");
    }
  };

  // Function to connect to MetaMask and transfer USDT
  const transferUSDT = async (amount) => {
    if (!isConnected) {
      await requestAccount();
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      const signer = provider.getSigner();

      const USDTContract = new ethers.Contract(USDTAddress, USDTABI, signer);

      const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);

      const signerAddress = await signer.getAddress();
      console.log(signerAddress);
      const signerBalance = await USDTContract.balanceOf(signerAddress);

      if (signerBalance.lt(amountInWei)) {
        toast.error("Your Balance is not enough");
        setLoading(false);
        return;
      }

      const tx = await USDTContract.transfer(recipient, amountInWei, {
        gasPrice: ethers.utils.parseUnits('10', 'gwei'),
        gasLimit: 2000000,
      });
      await tx.wait();

      console.log("Transaction Response:", tx);
      console.log("Transaction Mined!");
      const paymentData={
        "sender": tx?.from,
        "recipient":tx?.to,
         "hash": tx?.hash,
         "orderId": orderId
      }
      setLoading(false);
      dispatch(pay(paymentData))
      .then(()=>{
        navigate('/fruits');
      });
      
      
    } catch (error) {
      console.error("Error transferring USDT:", error);
    }
  };

  const handlePayNowClick = () => {
    setLoading(true);
    const totalAmount = orderState?.productCost + orderState?.shippingCost;
    if (totalAmount) {
      transferUSDT(totalAmount);
    }
  };
  const handleNavigate = () => {
    navigate('/fruits');
  };

  const handleDisconnect = () => {
    setAccount(null);
    setIsConnected(false);
    toast.info("Disconnected from MetaMask.");
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}....${address.slice(-4)}`;
  };

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Order Code: {orderState?.code}</h3>
              <h4 className="website-name">Shipping Information</h4>
              <p>Email: {orderState?.email}</p>
              <p>Phone No: {orderState?.phoneNo}</p>
              <h4 className="title total">Total amount: {orderState?.productCost + orderState?.shippingCost}</h4>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button className="button" type="submit" onClick={handlePayNowClick}
                disabled={loading}
                >
                  Pay now
                </button>
                {loading && (
                    <div className="spinner-border m-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                )}
                <button className="button" type="submit" onClick={handleNavigate}
                >
                  Continue to shopping
                </button>

              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="checkout-left-data">
              {isConnected ? (
                <>
                  <p className="wallet-address">Connected Wallet: {formatAddress(account)}</p>
                  <button className="button" type="submit" onClick={handleDisconnect}>
                    Disconnect
                  </button>
                </>
              ) : (
                <button className="button" type="submit" onClick={requestAccount}>
                  Connect your wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default BNBPayment;
