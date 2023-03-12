import React from 'react';
import { Row, Col } from 'react-bootstrap';

const BottomFooter = () => {
  return (
    <div className='bottom-footer'>
      <Row>
        <Col className='text-center'>
          MERN stack app developed by{' '}
          <a
            href='https://www.gabewd.com/'
            target='_blank'
            rel='noopener'
            results='noreferrer'
            id='linked'
          >
            &copy; gabewd.com
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default BottomFooter;
