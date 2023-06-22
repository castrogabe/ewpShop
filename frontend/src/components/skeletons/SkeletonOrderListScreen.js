import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Skeleton from './Skeleton';

const SkeletonOrderListScreen = () => {
  const isMobile = window.innerWidth <= 768; // Set your mobile breakpoint here

  return (
    <Row>
      {isMobile ? (
        <div className='mobile-image-card col-12'>
          {/* mobile view */}
          <Col className='left-col col-4'>
            <Skeleton classes='square' />
          </Col>
          <Col className='right-col col-8'>
            <Skeleton classes='title width-100 skeleton-title' />
            <Skeleton classes='text width-100 skeleton-text' />
          </Col>
        </div>
      ) : (
        <Row className='box col-12'>
          {/* desktop skeleton */}
          <Col className='left-col col-2'>
            <Skeleton classes='square' />
          </Col>
          <Col className='right-col col-10'>
            <Skeleton classes='title width-100 skeleton-title' />
            <Skeleton classes='text width-100 skeleton-text' />
          </Col>
        </Row>
      )}
    </Row>
  );
};

export default SkeletonOrderListScreen;
