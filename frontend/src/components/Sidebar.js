import { useContext, useEffect } from 'react';
import { Store } from '../Store';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ handleSidebarOpen }) => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const imageStyle = {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  };

  useEffect(() => {
    handleSidebarOpen();
    const timer = setTimeout(() => {
      handleSidebarOpen(); // Call the handleSidebarOpen function after the specified duration
    }, 2000); // Duration in milliseconds (2 second)

    return () => {
      clearTimeout(timer); // Clear the timer when the component unmounts or rerenders
    };
  }, []);

  return (
    <div className='content'>
      <br />
      <Row>
        <Col>
          {cartItems.length > 0 && (
            <ListGroup>
              <h4 className='text-center'>Items In Cart</h4>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Col>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='img-fluid rounded img-thumbnail'
                      style={imageStyle}
                    ></img>{' '}
                    <span>
                      <strong>{item.name}</strong> <br />
                      added to cart
                    </span>
                  </Col>
                  <hr />
                  <Col>Price: ${item.price}</Col>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Sidebar;
