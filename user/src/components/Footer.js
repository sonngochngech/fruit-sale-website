import React from 'react';
import { Link } from 'react-router-dom';
import { BsLinkedin, BsFacebook, BsYoutube, BsInstagram } from 'react-icons/bs';

const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src="images/newsletter.png" alt="newsletter" />
                <h2 className="mb-0 text-white">Sign Up for Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  Address : 01 Dai Co Viet, <br /> Hai Ba Trung, Hanoi <br />
                  PinCode: 024 3869 4242
                </address>
                <a
                  href="tel:+91 8264954234"
                  className="mt-3 d-block mb-1 text-white"
                >
                   Hotline: +91 8264954234
                </a>
                <a
                  href="mailto:navdeepdahiya753@gmail.com"
                  className="mt-2 d-block mb-0 text-white"
                >
                  Email: bachkhoahanoi4743@gmail.com
                </a>
                
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-link d-flex flex-column">
                <Link to="#" className="text-white py-2 mb-1">
                  Company Information :
                  Fresh Fruit trading and investment joint stock company.
                </Link>
                <Link to="#" className="text-white py-2 mb-1">
                  Refund Policy :
                  Return within 48 hours.
                </Link>
                <Link to="#" className="text-white py-2 mb-1">
                  Shipping Policy : Free delivery within Hanoi and Ho Chi Minh City.
                </Link>
                <Link to="#" className="text-white py-2 mb-1">
                  Customer care Email : FreshFruits@gmail.com
                </Link>
                <Link className="text-white py-2 mb-1"></Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">My Social Network</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-2 mb-1">Facebook : FreshFruit</Link>
                <Link className="text-white py-2 mb-1">Instagram : OurFreshFruit</Link>
                <Link className="text-white py-2 mb-1">Youtube :  Fresh Fruit Channel
                
                </Link>
                
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-link d-flex flex-column">
              <div className="social_icons d-flex align-items-center gap-30 mt-4">
              <a className="text-white" href="/">
                <BsLinkedin className="fs-4" />
              </a>
              <a className="text-white" href="/">
                <BsInstagram className="fs-4" />
              </a>
              <a className="text-white" href="/">
                <BsFacebook className="fs-4" />
              </a>
              <a className="text-white" href="/">
              <BsYoutube className="fs-4" />
            </a>
            </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}; Powered by Fresh Fruit
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
