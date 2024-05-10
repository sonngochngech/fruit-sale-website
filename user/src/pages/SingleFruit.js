import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import FruitCard from '../components/FruitCard';
import ReactImageZoom from 'react-image-zoom';

import { useLocation, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAFruit} from '../features/fruits/fruitSlice';
import { addFruitToCart, setPreOrder } from '../features/users/userSlice';

const SingleFruit = () => {
  const [amount, setAmount] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const getFruitId = location.pathname.split('/')[2];
  console.log(getFruitId);
  const dispatch = useDispatch();
  const fruitState = useSelector((state) => state?.fruit?.singlefruit);
  console.log(fruitState);
  const cartState = useSelector((state) => state?.auth?.cartFruits);
  useEffect(() => {
    dispatch(getAFruit(getFruitId));
  }, []);

  useEffect(() => {
    for (let i = 0; i < cartState?.length; i++) {
      if (getFruitId === cartState[i]?.FruitId) {
        setAlreadyAdded(true);
      }
    }
  }, []);

  const uploadCart = () => {
    if (amount > fruitState?.amount) {
      // Hiển thị thông báo lỗi
      alert(
        `Số lượng sản phẩm vượt quá số lượng còn lại.(${fruitState?.amount})`
      );
      return;
    }

    dispatch(
      addFruitToCart({
        fruitId: fruitState?.id,
        amount,
        price: fruitState?.price,
      })
    );
    navigate('/cart');
  };

  useEffect(() => {
    // Kiểm tra số lượng còn lại
    if (fruitState?.amount === 0) {
      setAmount(0);
    } else if (fruitState?.amount < amount) {
      setAmount(fruitState?.amount);
    }
  }, [fruitState]);
  const props = {
    width: 594,
    height: 600,
    zoomWidth: 600,

    img: "http://localhost:8081/"+fruitState?.FruitImages[0]?.link
      ? "http://localhost:8081/"+ fruitState?.FruitImages[0]?.link
      : 'https://img.freepik.com/free-photo/vibrant-collection-healthy-fruit-vegetables-generated-by-ai_24640-80425.jpg',
  };

  const [orderedFruit, setorderedFruit] = useState(true);
  const handleCheckOut=()=>{
    const preOrder=[];
    preOrder.push({
      Fruit: fruitState,
      FruitId: fruitState.id,
      amount: amount
    })
    dispatch(setPreOrder(preOrder))
    navigate('/checkout')

  }
  const copyToClipboard = async (text) => {
    {
      /*thay thế chỗ này*/
    }
    console.log('text', text);
    try {
      await navigator.clipboard.writeText(text);
      console.log('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  const closeModal = () => {};
  return (
    <>
      <Meta title={'Fruit Name'} />
      <BreadCrumb title="Fruit Name" />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {fruitState?.FruitImages.map((item, index) => {
                return (
                  <div key={index}>
                    <img src={"http://localhost:8081/"+item?.link} className="img-fluid" alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{fruitState?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">$ {fruitState?.price}</p>
              
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Code :</h3>
                  <p className="product-data">{fruitState?.code}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">{fruitState?.Category?.name}</p>
                </div>
            
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  {alreadyAdded === false && (
                    <>
                      <h3 className="product-heading">Amount :</h3>
                      <div className="">
                        <input
                          type="number"
                          name=""
                          min={1}
                          max={10}
                          className="form-control"
                          style={{ width: '70px' }}
                          id=""
                          onChange={(e) => setAmount(e.target.value)}
                          value={amount}
                        />
                      </div>
                    </>
                  )}
                  <div
                    className={
                      alreadyAdded
                        ? 'ms-0'
                        : ' ms-5' + 'd-flex align-items-center gap-30'
                    }
                  >
                    <button
                      className="button border-0"
                 
                      type="button"
                      onClick={() => {
                        alreadyAdded ? navigate('/cart') : uploadCart();
                      }}
                    >
                      {alreadyAdded ? 'Go to cart' : 'Add to card'}
                    </button>

                    <button className="button signup" onClick={handleCheckOut}>Buy It Now</button>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                </div>
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all US domestic orders within
                    <b>5-10 business days!</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: fruitState?.description,
                  }}
                ></p>
              </p>
            </div>
          </div>
        </div>
      </Container>
      
    </>
  );
};

export default SingleFruit;
