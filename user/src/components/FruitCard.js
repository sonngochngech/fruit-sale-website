import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link, useLocation } from 'react-router-dom';
import wish from '../images/wish.svg';
import addcart from '../images/add-cart.svg';
import view from '../images/view.svg';
import { useDispatch } from 'react-redux';
import { addToWishList } from '../features/fruits/fruitSlice';
// import { base_url } from "./../utils/axiosConfig";
const FruitCard = (props) => {
  const { grid, data } = props;
  const dispatch = useDispatch();
  let location = useLocation();

  return (
    <>
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={` ${
              location.pathname == '/fruits' ? `gr-${grid}` : 'col-3'
            } `}
          >
            <div className="product-card position-relative">
              <div className="wishlist-icon position-absolute">
              </div>
              <div className="product-image">
                <img
                  src={"http://localhost:8081/"+ item?.FruitImages[0]?.link}
                  className="img-fluid mx-auto"
                  alt="fruit"
                  width={160}
                />
                  <img
                  src={"http://localhost:8081/"+ item?.FruitImages[1]?.link}
                  className="img-fluid mx-auto"
                  alt="fruit"
                  width={160}
                />
              </div>
              <div className="product-details">
                <h6 className="brand">{item?.code}</h6>
                <h5 className="product-title">{item?.title}</h5>
                {/* <ReactStars
                  count={5}
                  size={24}
                  value={item?.rating}
                  edit={false}
                  activeColor="#ffd700"
                /> */}
                <p
                  className={`description ${
                    grid === 12 ? 'd-block' : 'd-none'
                  }`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
                <p className="price">{item?.price}$</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <Link
                    to={'/fruits/' + item?.id}
                    className="border-0 bg-transparent"
                  >
                    <img src={view} alt="view" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FruitCard;
