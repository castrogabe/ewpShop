import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  Col,
  Row,
  ListGroup,
  Form,
  Badge,
  Button,
  FloatingLabel,
} from 'react-bootstrap';
import ReactImageMagnify from 'react-image-magnify';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useMediaQuery } from 'react-responsive';
import SkeletonProductMagScreen from '../components/skeletons/SkeletonProductMagScreen';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductMagScreen() {
  let reviewsRef = useRef();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: '',
    });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        // Simulate delay for 1.5 seconds
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        ...product,
        quantity,
      },
    });
    navigate('/cart');
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      toast.error('Please enter comment and rating');
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/products/${product._id}/reviews`,
        { rating, comment, name: userInfo.name },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Review submitted successfully');
      product.reviews.unshift(data.review);
      product.numReviews = data.numReviews;
      product.rating = data.rating;
      dispatch({ type: 'REFRESH_PRODUCT', payload: product });
      window.scrollTo({
        behavior: 'smooth',
        top: reviewsRef.current.offsetTop,
      });
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  // zoom magnifier
  const images = [product.image];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const hoverHandler = (image, i) => {
    setSelectedImage(image);
    refs.current[i].classList.add('active1');
    for (var j = 0; j < images.length; j++) {
      if (i !== j) {
        refs.current[j].classList.remove('active1');
      }
    }
    const textElement = document.querySelector('.text');
    if (textElement) {
      textElement.textContent = 'Click to Enlarge or Hover to Zoom';
    }
  };
  const hoverOffHandler = (i) => {
    refs.current[i].classList.remove('active1');
  };

  const refs = useRef([]);
  refs.current = [];
  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };
  // end zoom magnifier

  const mobileView = useMediaQuery({ maxWidth: 992 });

  return loading ? (
    <SkeletonProductMagScreen />
  ) : error ? (
    <MessageBox variant='danger'>{error}</MessageBox>
  ) : (
    <div className='content'>
      <br />
      <Row className='box'>
        <p className='mt-3'>
          ~ All of the pens shown are handmade and designed by me, no two pens
          are identical but can be similar to each other. If there is something
          you like about one pen and it is not available on another pen please
          contact me using the email me link below and I will gladly do my best
          to work with you on what type of kit pen or bespoke pen will suit your
          needs. ~
        </p>
      </Row>
      <br />
      <Row>
        <Col md={6} className='container'>
          {mobileView ? (
            <Carousel>
              {product.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={product.name}
                    className='img-large'
                    loading='lazy'
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <div className='left'>
              {/* thumbnail images */}
              <div className='left_1'>
                {[product.image, ...product.images].map((image, i) => (
                  <div
                    className={i === 0 ? 'img_wrap active' : 'img_wrap'}
                    key={i}
                    onMouseOver={() => hoverHandler(image, i)}
                    onMouseLeave={() => hoverOffHandler(i)}
                    ref={addRefs}
                    onClick={() => openLightbox(i + 1)}
                  >
                    <Card.Img src={image} alt='' loading='lazy' />
                  </div>
                ))}
              </div>

              {/* main image */}
              <div className='img-large' onClick={() => openLightbox(0)}>
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      src: selectedImage || product.image,
                      alt: '',
                      isFluidWidth: true,
                    },
                    largeImage: {
                      src: selectedImage || product.image,
                      width: 1200,
                      height: 1800,
                    },
                    enlargedImageContainerDimensions: {
                      width: '160%',
                      height: '125%',
                    },
                  }}
                />
                <p className='text'>
                  Roll over image to zoom in or Click to enlarge
                </p>
              </div>
            </div>
          )}
        </Col>

        <Col md={6}>
          <div className='box'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h4>{product.name}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to='/contact' className='email'>
                  Product Question?
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
              <ListGroup.Item>Style : {product.style}</ListGroup.Item>
              <ListGroup.Item>Finish : {product.finish}</ListGroup.Item>
              <ListGroup.Item>
                Description:
                <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </div>

          <br />

          <div className='box'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? (
                      <Badge bg='success'>In Stock</Badge>
                    ) : (
                      <Badge bg='danger'>Unavailable</Badge>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <div className='d-grid'>
                    {/* low quantity alert 5 or less */}
                    {product.countInStock <= 5 && (
                      <p style={{ color: 'red' }}>
                        Only {product.countInStock} Left, buy Now!
                      </p>
                    )}
                    {/* end low quantity alert */}
                    <Button onClick={addToCartHandler} variant='primary'>
                      Add to Cart
                    </Button>
                  </div>
                </ListGroup.Item>
              )}
            </ListGroup>
          </div>
        </Col>
      </Row>

      <br />

      <div className='box'>
        <h4 ref={reviewsRef}>Reviews</h4>
        <div className='mb-3'>
          {product.reviews.length === 0 && (
            <MessageBox>There is no review</MessageBox>
          )}
        </div>
        <ListGroup>
          {product.reviews.map((review) => (
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>
              <Rating rating={review.rating} caption=' '></Rating>
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className='my-3'>
          {userInfo ? (
            <Form onSubmit={submitHandler}>
              <h2>Write a customer review</h2>
              <Form.Group className='mb-3' controlId='rating'>
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  aria-label='Rating'
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value=''>Select...</option>
                  <option value='1'>1- Poor</option>
                  <option value='2'>2- Fair</option>
                  <option value='3'>3- Good</option>
                  <option value='4'>4- Very good</option>
                  <option value='5'>5- Excellent</option>
                </Form.Select>
              </Form.Group>
              <FloatingLabel
                controlId='floatingTextarea'
                label='Write your comment'
                className='mb-3'
              >
                <Form.Control
                  as='textarea'
                  placeholder='Leave a comment here'
                  style={{ height: '100px' }}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </FloatingLabel>

              <div className='mb-3'>
                <Button disabled={loadingCreateReview} type='submit'>
                  Submit
                </Button>
                {loadingCreateReview && (
                  <SkeletonProductMagScreen></SkeletonProductMagScreen>
                )}
              </div>
            </Form>
          ) : (
            <MessageBox>
              Please{' '}
              <Link to={`/signin?redirect=/product/${product.slug}`}>
                Sign In
              </Link>{' '}
              to write a review
            </MessageBox>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <div className='lightbox'>
        {lightboxOpen && (
          <Lightbox
            mainSrc={
              lightboxIndex === 0
                ? product.image
                : product.images[lightboxIndex - 1]
            }
            nextSrc={
              lightboxIndex === product.images.length
                ? null
                : product.images[lightboxIndex]
            }
            prevSrc={
              lightboxIndex === 0 ? null : product.images[lightboxIndex - 2]
            }
            onCloseRequest={() => setLightboxOpen(false)}
            onMovePrevRequest={() => setLightboxIndex(lightboxIndex - 1)}
            onMoveNextRequest={() => setLightboxIndex(lightboxIndex + 1)}
          />
        )}
      </div>
      <br />
    </div>
  );
}

export default ProductMagScreen;
