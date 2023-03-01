import React from 'react';
import { Row, Col, Nav } from 'react-bootstrap';

function BottomHeader() {
  return (
    <div>
      <Row>
        <Col>
          <Row>
            <Nav className='bottom-header'>
              <Nav.Item>category</Nav.Item>
            </Nav>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default BottomHeader;
