import React from 'react';
import { Row, Col } from 'react-bootstrap';

const BottomFooter = () => {
  return (
    <div className='bottom-footer'>
      <Row>
        <Col className='text-center'>
          Powered by{' '}
          <a href='https://www.gabewd.com/' id='linked'>
            {' '}
            &copy; gabewd.com
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default BottomFooter;
