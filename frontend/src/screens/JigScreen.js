import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

export const JigScreen = () => {
  return (
    <>
      <br />
      <div className='content'>
        <div className='box'>
          <h2>Popular Woodworking Jigs</h2>
          <p>
            ~ When I started woodworking years ago I consumed as much
            information as I could on TV and Magazines. I subscribed to several
            magazines over the years to learn and also to share what I learned
            along the way. I was fortunate enough to share my jigs with Popular
            Woodworking Magazine and 5 of my tips were published years ago.
            Since then I have shared the same tips on my{' '}
            <a href='https://www.youtube.com/channel/UCVdwaT1LF4iv6q5okes29tA'>
              <span className='youtube'>YouTube</span>
            </a>{' '}
            Exotic Wood Pen channel and many other great videos. ~
          </p>
        </div>
        <Row>
          <Col md={6}>
            <Card>
              <img
                src='/images/routerTable.png'
                className='img-responsive'
                alt='routerTable Extension'
              />
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <img
                src='/images/tableSaw.png'
                className='img-responsive'
                alt='routerTable'
              />
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={6}>
            <Card>
              <img
                src='/images/routerJig.png'
                className='img-responsive'
                alt='routerJig'
              />
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <img
                src='/images/shopShoes.png'
                className='img-responsive'
                alt='shopShoes'
              />
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={6}>
            <Card>
              <img
                src='/images/holeSaw.png'
                className='img-responsive'
                alt='holeSaw'
              />
            </Card>
          </Col>
        </Row>
        <br />
      </div>
    </>
  );
};

export default JigScreen;
