import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Col, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getError } from '../utils';
import axios from 'axios';

const BottomHeader = () => {
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
  }, []);
  return (
    <div>
      <Row>
        <Col>
          <Row>
            <Nav className='bottom-header'>
              {categories.map((category) => (
                <Nav.Item key={category}>
                  <LinkContainer to={`/search?category=${category}`}>
                    <Nav.Link className='text-light'>{category}</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              ))}
            </Nav>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default BottomHeader;
