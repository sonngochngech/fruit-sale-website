import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-stars";
import { useState } from "react";
import FruitCard from "../components/FruitCard";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFruitCategories,
  getAllFruits,
  searchFruitByName,
} from "../features/fruits/fruitSlice";
import Container from "../components/Container";
import { useLocation } from "react-router-dom";

const OurStore = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const titleq = queryParams.get('title');
  const [grid, setGrid] = useState(4);
  const [params, setParams] = useState({
    sort: '',
    category: '',
    priceStart: 0,
    priceEnd: 9999999,
    title: '',
  })
  const fruitState = useSelector((state) => state.fruit.fruits);
  const [showedFruitState,setShowedFruitState]=useState([]);
  const fruitCategoriesState = useSelector(
    (state) => state.fruit.fruitCategories
  );
   
  const dispatch = useDispatch();
  useEffect(() => {
    getFruitCategories();
    dispatch(getAllFruits());
  
    if( titleq===null) setParams({...params, title: ''})
    else  setParams({...params, title: titleq})
  


  }, [titleq]);

 
  useEffect(() => {
    setShowedFruitState(fruitState);
  }, [fruitState]); 

  const sortFruits = (fruits, sortType) => {
    if (sortType === 'asc') {
      return fruits.sort((a, b) => a.price - b.price);
    } else if (sortType === 'desc') {
      return fruits.sort((a, b) => b.price - a.price);
    }
    return fruits; // Return a new array to avoid mutation
  };
  useEffect(()=>{
    let filteredFruits;
     filteredFruits=fruitState?.filter((item)=>(params.category!=="" ? item?.Category.name === params.category: true )&& item.price >= params.priceStart && item.price<=params.priceEnd && params.title!=="" ? item?.title.toLowerCase().includes(params.title.toLowerCase()): true);
    
    const sortedFruits = sortFruits(filteredFruits, params.sort);
    setShowedFruitState(sortedFruits);




  },[params,fruitState]);


  const getFruitCategories = () => {
    dispatch(getAllFruitCategories());
  };

  const handleSeach=(name)=>{
    dispatch(searchFruitByName(name))
  }

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              {/* {productCategoriesState &&
                productCategoriesState?.map((item, index) => {
                  return (
                    <div>
                      <ul key={index} className="ps-0">
                        <li>{item?.title}</li>
                      </ul>
                    </div>
                  );
                })} */}
                <select
                    name=""
                    defaultValue={""}
                    onChange={e => setParams({...params, category: e.target.value})}
                    // value={sort}
                    className="form-control form-select"
                    id=""
                  >
                    <option value="">All category</option>
                    {
                      fruitCategoriesState?.map((item, index) => {
                        return (
                          <option key={index} value={item.name}>{item.name}</option>
                        );
                    }
                      )
                  }
                    
                  </select>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                <h5 className="sub-title">Search</h5>
                <div>
                  
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="searchName"
                      placeholder="Name"
                      onChange={e => setParams({...params, title: e.target.value? e.target.value : '' })}
                    />
                    <label htmlFor="searchName">Title</label>
                  </div>
                  {/* <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                    <label className="form-check-label" htmlFor="">
                      Out of Stock(0)
                    </label>
                  </div> */}
                </div>
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                      onChange={e => setParams({...params, priceStart: e.target.value? e.target.value : 0 })}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                      onChange={e => setParams({...params, priceEnd: e.target.value? e.target.value : 999999 })}
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
                {/* <h5 className="sub-title">Colors</h5>
                <div></div>
                <h5 className="sub-title">Size</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-1"
                    />
                    <label className="form-check-label" htmlFor="color-1">
                      S (2)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-2"
                    />
                    <label className="form-check-label" htmlFor="color-2">
                      M (2)
                    </label>
                  </div>
                </div> */}
              </div>
            </div>

          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: "100px" }}>
                    Sort By:
                  </p>
                  <select
                    name=""
                    defaultValue={""}
                    onChange={e => setParams({...params, sort: e.target.value})}
                    // value={sort}
                    className="form-control form-select"
                    id=""
                  >
                    <option value="manual">Manual</option>
                    <option value="asc">Price, low to high</option>
                    <option value="desc">Price, high to low</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  {/* <p className="totalproducts mb-0">
                    {Object.keys(fruitState).length} Fruits
                  </p> */}
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      src="images/gr2.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />

                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                <FruitCard data={showedFruitState || []} grid={grid} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
  