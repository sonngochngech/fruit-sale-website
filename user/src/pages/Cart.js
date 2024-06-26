import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { AiFillDelete } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import { useDispatch } from 'react-redux';

import {
  getUserCart,
  deleteCartFruit,
  updateCartFruit,
  setPreOrder
} from '../features/users/userSlice';
import { useSelector } from 'react-redux';
import { base_domain, base_domain_client } from '../utils/axiosConfig';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fruitUpdateDetail, setFruitUpdateDetail] = useState({});
  const [checkboxes, setCheckboxes] = useState([]);

  const [totalAmount, setTotalAmount] = useState(null);
  const [amountErrors, setAmountErrors] = useState([]);
  const userCartState = useSelector((state) => state?.auth?.cartFruits);
  useEffect(() => {
    dispatch(getUserCart());
  }, []);
  // useEffect(() => {
  //   Object.keys(fruitUpdateDetail).forEach((FruitId) => {
  //     const detail = fruitUpdateDetail[FruitId];
  //     dispatch(
  //       updateCartFruit({
  //         fruitId: detail.FruitId,
  //         amount: detail.amount,
  //       })
  //     ).finally(()=>{
  //       dispatch(getUserCart())
  //     });
  //   })

  // }, [fruitUpdateDetail]);

  const deleteACartFruit = (FruitId) => {
    dispatch(deleteCartFruit(FruitId))
      .finally(() => { dispatch(getUserCart()); });

  };
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      if (checkboxes[userCartState[index]?.Fruit.id]) {
        let fAmount = fruitUpdateDetail[userCartState[index].Fruit.id]?.amount ? fruitUpdateDetail[userCartState[index].Fruit.id]?.amount : userCartState[index]?.amount
        sum =
          sum +
          Number(fAmount * userCartState[index]?.Fruit.price);

      }


    }
    setTotalAmount(sum);
  }, [userCartState, checkboxes, fruitUpdateDetail]);

  const handleAmountChange = (e, item) => {
    const updatedAmount = e.target.value;

    const remainingAmount = item?.Fruit?.amount;


    if (updatedAmount > remainingAmount) {
      setAmountError(
        item.FruitId,
        `Exceeds available amount (${remainingAmount})`
      );
    } else {
      setAmountError(item.FruitId, ''); // Clear the error for the specific item
      const updatedFruit = {
        FruitId: item.FruitId,
        amount: updatedAmount,
      };

      setFruitUpdateDetail((prevState) => ({
        ...prevState,
        [item.FruitId]: updatedFruit,
      }));
    }
  };

  const setAmountError = (itemId, error) => {
    setAmountErrors((prevState) => ({
      ...prevState,
      [itemId]: error,
    }));
  };

  const getAmountError = (itemId) => {
    return amountErrors[itemId] || '';
  };

  const handleCheckboxChange = (event) => {
    const { name } = event.target;


    console.log(fruitUpdateDetail[name]);
    if (!checkboxes[name] && fruitUpdateDetail[name]) {
      dispatch(updateCartFruit(
        {
          fruitId: fruitUpdateDetail[name].FruitId,
          amount: fruitUpdateDetail[name].amount,
        }
      )).finally(() => {
        dispatch(getUserCart())
          .finally(() => {
            setCheckboxes({
              ...checkboxes,
              [name]: !checkboxes[name]
            })
          });
      })
    }else{
      setCheckboxes({
        ...checkboxes,
        [name]: !checkboxes[name]
      })  

    }
  }
  useEffect(() => {
    console.log(checkboxes);
    // handleCheckOut();


  }, [checkboxes])
  const handleCheckOut = () => {

    const idList = Object.entries(checkboxes)
      .filter(([_, isChecked]) => isChecked)
      .map(([id, _]) => parseInt(id));

    const preOrder = userCartState?.filter(item => idList.includes(item.FruitId));
    console.log(preOrder);
    dispatch(setPreOrder(preOrder));
    navigate('/checkout');


  };

  return (
    <>
      <Meta title={'Cart'} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Fruit</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Amount</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {userCartState &&
              userCartState?.map((item, index) => {
                const amountError = getAmountError(item.FruitId);
                return (
                  <div>
                    {item?.Fruit.isDeleted === 1 && (
                      <p className='mb-0'>The fruit is no longer valid</p>
                    )}
                    <div
                      key={index}
                      className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                    >
                      <div className="cart-col-1 gap-15 d-flex align-items-center ">
                        <div className="w-25">
                          <input
                            type="checkbox"
                            name={item.FruitId}
                            disabled={item?.Fruit.isDeleted === 1}
                            checked={!!checkboxes[`${item.FruitId}`]}
                            onChange={handleCheckboxChange}

                          ></input>
                        </div>
                        <div className="w-25">
                          <img
                            src={base_domain + item?.Fruit.FruitImages[0]?.link}
                            onError={(e) => { e.target.src = `${base_domain_client}logo.png`; }}

                            className="img-fluid"
                            alt="product"
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="w-50">
                          <p>{item?.Fruit?.title}</p>
                        </div>
                      </div>
                      <div className="cart-col-2">
                        <h5 className="price">$ {item?.Fruit?.price}</h5>
                      </div>
                      <div className="cart-col-3 d-flex align-items-center gap-15">
                        <div>
                          <input
                            className="form-control e"
                            type="number"
                            name=""
                            min={1}
                            max={100}
                            id=""
                            value={
                              fruitUpdateDetail[item.FruitId]?.amount
                                ? fruitUpdateDetail[item.FruitId]?.amount
                                : item.amount
                            }

                            disabled={item?.Fruit.isDeleted === 1}
                            onChange={(e) => handleAmountChange(e, item)}
                          />
                          {amountError && (
                            <p
                              style={{
                                color: 'red',
                                fontSize: '12px',
                                margin: 0,
                              }}
                            >
                              {amountError}
                            </p>
                          )}
                        </div>
                        <div>
                          <AiFillDelete
                            onClick={() => {
                              deleteACartFruit(item?.FruitId);
                            }}
                            className="text-danger "
                          />
                        </div>
                      </div>
                      <div className="cart-col-4">
                        <h5 className="price">
                          $ {item?.Fruit?.price *
                            (fruitUpdateDetail[item.FruitId]?.amount
                              ? fruitUpdateDetail[item.FruitId]?.amount
                              : item.amount)}
                        </h5>
                      </div>
                    </div>
                  </div>


                );
              })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/fruits" className="button">
                Continue To Shopping
              </Link>
              {(totalAmount !== null || totalAmount !== 0) && (
                <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal: $ {totalAmount}</h4>
                  <button onClick={handleCheckOut} className="btn btn-warning" disabled={!totalAmount}>
                    Checkout
                  </button>

                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
