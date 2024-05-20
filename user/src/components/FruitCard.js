import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import view from '../images/view.svg';
import { useDispatch } from 'react-redux';
import { base_domain, base_url } from "./../utils/axiosConfig";
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
                  src={base_domain+ item?.FruitImages[0]?.link}
                  onError={(e) => { e.target.src = `${base_domain}logo.png`; }} 
                  className="img-fluid mx-auto"
                  alt="fruit"S
                  width={160}
                />
                  <img
                  src={base_domain+ item?.FruitImages[1]?.link}
                  onError={(e) => { e.target.src = `${base_domain}banner.jpg`; }} 
                  className="img-fluid mx-auto"
                  alt="fruit"
                  width={160}
                />
              </div>
              <div className="product-details">
                <h6 className="brand">{item?.code}</h6>
                <h5 className="product-title">{item?.title}</h5>
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
