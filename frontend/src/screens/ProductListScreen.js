import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        totalProducts: action.payload.totalProducts, // Include totalProducts in the state
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loadingCreate: false,
      };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };

    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };

    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function ProductListScreen() {
  const [
    {
      loading,
      error,
      products,
      totalProducts, // totalProducts display in h4
      pages,
      loadingCreate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
    products: [], // Ensure products is initialized as an empty array
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page} `, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {}
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete]);

  const createHandler = async () => {
    if (window.confirm('Are you sure to create?')) {
      try {
        dispatch({ type: 'CREATE_REQUEST' });
        const { data } = await axios.post(
          '/api/products',
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        toast.success('product created successfully', {
          autoClose: 1000, // Display success message for 1 second
        });
        dispatch({ type: 'CREATE_SUCCESS' });
        navigate(`/admin/product/${data.product._id}`);
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: 'CREATE_FAIL',
        });
      }
    }
  };

  const deleteHandler = async (product) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        await axios.delete(`/api/products/${product._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('product deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };

  return (
    <div className='content'>
      <br />
      <Row className='box'>
        <Col md={6}>
          <h4>
            Product List Page (
            {totalProducts !== undefined ? totalProducts : 'Loading...'}{' '}
            Products Database)
          </h4>
        </Col>

        <Col md={6} className='col text-end'>
          <Button type='button' onClick={createHandler}>
            Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <LoadingBox delay={1000} />}
      {loadingDelete && <LoadingBox delay={1000} />}

      {loading ? (
        <LoadingBox delay={1000} />
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <>
          <div className='box'>
            <Table responsive striped bordered className='noWrap'>
              <thead className='thead'>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>QTY</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>STYLE</th>
                  <th>FINISH</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      {product._id}
                      <div key={product._id}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className='img-fluid rounded img-thumbnail'
                        />
                        <Link to={`/product/${product.slug}`}></Link>
                      </div>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.countInStock}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.style}</td>
                    <td>{product.finish}</td>
                    <td>
                      <Button
                        type='button'
                        variant='primary'
                        onClick={() =>
                          navigate(`/admin/product/${product._id}`)
                        }
                      >
                        Edit
                      </Button>
                      &nbsp;
                      <Button
                        type='button'
                        variant='primary'
                        onClick={() => deleteHandler(product)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          <div>
            {[...Array(pages).keys()].map((x) => (
              <LinkContainer
                key={x + 1}
                className='mx-1'
                to={`/admin/products?page=${x + 1}`}
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
    </div>
  );
}
