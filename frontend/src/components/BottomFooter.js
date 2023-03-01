import React from 'react';
import { Row, Col } from 'react-bootstrap';

function BottomFooter() {
  return (
    <div className='bottom-footer'>
      <Row>
        <Col className='text-center'>
          Powered by{' '}
          <a href='https://gabewd.herokuapp.com' id='linked'>
            {' '}
            &copy; gabewd.com
          </a>
        </Col>
      </Row>
    </div>
  );
}

export default BottomFooter;
