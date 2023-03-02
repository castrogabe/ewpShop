import React, { useEffect, useReducer, useState } from 'react';
import Jumbotron from '../components/Jumbotron';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Helmet } from 'react-helmet-async';
import { Row, Col, Button } from 'react-bootstrap';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import LinkContainer from 'react-router-bootstrap/LinkContainer';

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

export default function SearchScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category = products
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
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
  }, [page]);

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
            {loading ? (
              <LoadingBox></LoadingBox>
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
                      <Product product={product}></Product>
                    </Col>
                  ))}
                </Row>
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
