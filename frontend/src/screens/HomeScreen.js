import React, { useEffect, useReducer, useState } from 'react';
import Jumbotron from '../components/Jumbotron';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { getError } from '../utils';
import { Helmet } from 'react-helmet-async';
import { Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import SkeletonHomeScreen from '../components/skeletons/SkeletonHomeScreen';
import Sidebar from '../components/Sidebar';
import { useMediaQuery } from 'react-responsive';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default function HomeScreen() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
    setTimeout(() => {
      setIsSidebarOpen(false);
    }, 2000); // Close sidebar 2000 milliseconds (2 second)
  };
  // By adding the setTimeout callback inside the handleSidebarOpen function,
  // it will open the sidebar by setting isSidebarOpen to true and then close it by
  // setting isSidebarOpen back to false after the specified duration.

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category = products
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      // Simulate delay for 1.5 seconds
      await new Promise((resolve) => setTimeout(resolve, 1500));

      try {
        const { data } = await axios.get(`/api/products/search?page=${page}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [page, error]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    return `/?&page=${filterPage}`;
  };

  return (
    <>
      <div className='jumbotron1' alt='tools'>
        <Jumbotron
          text={[
            'Bespoke Pens',
            'Kit Pens',
            'Segmented Pens',
            'Steampunk Pens',
            'Wine Bottle Stoppers',
          ]}
        />
      </div>

      <div className='content'>
        <br />
        <Helmet>
          <title>Exotic Wood Pen</title>
        </Helmet>
        <div className='box'>
          <h5>Always Hand Made</h5>
          <p className='mt-3'>
            ~ I use quality pen kits and pen blanks are hand made by me in my
            shop from Exotic Woods, Acrylics, Ebonite Materials, Bespoke pens
            are not kit pens, they are made completely from scratch except for
            the Jowo #6 nib and converters. ~
          </p>
        </div>
        <br />
        <Row>
          <Col>
            {/* react skeleton for product card */}
            {loading ? (
              <Row>
                {[...Array(12).keys()].map((i) => (
                  <Col key={i} sm={6} md={4} lg={3} className='mb-3'>
                    <SkeletonHomeScreen />
                  </Col>
                ))}
              </Row>
            ) : error ? (
              <MessageBox variant='danger'>{error}</MessageBox>
            ) : (
              <>
                {products.length === 0 && (
                  <MessageBox>No Product Found</MessageBox>
                )}
                <Row>
                  {products.map((product) => (
                    <Col
                      key={product.slug}
                      sm={6}
                      md={4}
                      lg={3}
                      className='mb-3'
                    >
                      {/* Product comes from components > Product.js */}
                      <Product
                        key={product.id}
                        product={product}
                        handleSidebarOpen={handleSidebarOpen}
                      />
                    </Col>
                  ))}
                </Row>

                {/* Desktop renders sidebar, if mobile do not show sidebar and get toast notifications */}
                {!isMobile ? (
                  isSidebarOpen && (
                    <div className='sidebar'>
                      <Sidebar handleSidebarOpen={handleSidebarOpen} />
                    </div>
                  )
                ) : (
                  <ToastContainer position='bottom-center' />
                )}

                {/* pagination */}
                <div>
                  {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                      key={x + 1}
                      className='mx-1'
                      to={getFilterUrl({ page: x + 1 })}
                    >
                      <Button
                        className={Number(page) === x + 1 ? 'text-bold' : ''}
                        variant='light'
                      >
                        {x + 1}
                      </Button>
                    </LinkContainer>
                  ))}
                </div>
                <br />
              </>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
}
