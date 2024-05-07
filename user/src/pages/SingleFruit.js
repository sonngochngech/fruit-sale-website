import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import FruitCard from '../components/FruitCard';
import ReactImageZoom from 'react-image-zoom';
import Color from '../components/Color';
import { TbGitCompare } from 'react-icons/tb';
import { AiOutlineHeart } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
                {/* <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={fruitState?.totalratings}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">( 2 Reviews )</p>
                </div> */}
                {/* <a className="review-btn" href="#review">
                  Write a Review
                </a> */}
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
                {/* <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availablity :</h3>
                  <p className="product-data">In Stock</p>
                </div> */}
                {/* <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Size :</h3>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      S
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      M
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XL
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XXL
                    </span>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Color :</h3>
                  <Color />
                </div> */}
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
                      // data-bs-toggle="modal"
                      // data-bs-target="#staticBackdrop"
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
                  {/* <div>
                    <a href="/">
                      <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                    </a>
                  </div> */}
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
      {/* <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on 2 Reviews</p>
                  </div>
                </div>
                {orderedFruit && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="/">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={true}
                      activeColor="#ffd700"
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button border-0">Submit Review</button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-4">
                <div className="review">
                  <div className="d-flex gap-10 align-items-center">
                    <h6 className="mb-0">Hai Hoang</h6>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                  <p className="mt-3">Very nice</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container> */}

      
    </>
  );
};

export default SingleFruit;
