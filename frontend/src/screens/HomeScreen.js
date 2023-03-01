import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function HomeScreen() {
  return (
    <>
      <div className='content'>
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
      </div>
      <Row>
        <Col></Col>
      </Row>
    </>
  );
}
