import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function HomeScreen() {
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
                    <p>
                      <strong>${product.price}</strong>
                    </p>
                    <button>Add to cart</button>
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
c;
