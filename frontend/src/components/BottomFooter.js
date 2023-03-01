import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BottomFooter = () => {
  return (
    <div className='bottom-footer'>
      <Row>
        <Col className='text-center'>
          Powered by{' '}
          <Link to='https://gabewd.herokuapp.com' id='linked'>
            {' '}
            &copy; gabewd.com
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default BottomFooter;
