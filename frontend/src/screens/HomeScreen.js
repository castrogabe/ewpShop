import React, { useEffect, useReducer } from 'react';
import Jumbotron from '../components/Jumbotron';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='jumbotron1' alt='tools'>
        <Jumbotron
          text={[
            'Steampunk Pens',
            'Segmented Pens',
            'Segmenting Videos',
            'Kit Pens',
            'Bespoke Fountain Pens',
          ]}
        />
      </div>

      <div className='content'>
        <Helmet>
          <title>Exotic Wood Pen</title>
        </Helmet>
        <h1>Featured Pens</h1>
        <div className='box'>
          <p>
            ~ I use quality pen kits and pen blanks are hand made by me in my
            shop from Exotic Woods, Acrylics, Ebonite Materials, Bespoke pens
            are not kit pens, they are made completely from scratch except for
            the Jowo #6 nib and converters. ~
          </p>
        </div>
        <Row>
          <Col>
            {' '}
            <div className='products'>
              {loading ? (
                <LoadingBox />
              ) : error ? (
                <MessageBox variant='danger'>{error}</MessageBox>
              ) : (
                <Row>
                  {products.map((product) => (
                    <Col
                      key={product.slug}
                      sm={6}
                      md={4}
                      lg={3}
                      className='mb-3'
                    >
                      <Product product={product}></Product>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default HomeScreen;
