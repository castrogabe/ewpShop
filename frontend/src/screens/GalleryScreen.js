import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function GalleryScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='content'>
        <br />
        <div className='box'>
          <h2>Gallery</h2>
        </div>

        <Row>
          <Col>
            <div className='products'>
              {products.map((product) => (
                <div className='product' key={product.slug}>
                  <Link to={`/product/${product.slug}`}>
                    <img src={product.image} alt={product.name} />
                  </Link>
                  <div className='product-info'>
                    <Link to={`/product/${product.slug}`}>
                      <p>{product.name}</p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
