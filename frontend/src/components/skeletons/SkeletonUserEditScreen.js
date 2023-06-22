import React from 'react';
import { Col, Card } from 'react-bootstrap';
import Skeleton from './Skeleton';

const SkeletonUserEditScreen = () => {
  const isMobile = window.innerWidth <= 768; // Set your mobile breakpoint here

  return (
    <div className='small-container'>
      <br />
      {isMobile ? (
        <Card className='mobile-image-card'>
          <Skeleton classes='title width-100 skeleton-title' />
          <Skeleton classes='title width-100 skeleton-title' />
          <Skeleton classes='title width-25 skeleton-title' />
          <Skeleton classes='title width-25 skeleton-title' />
        </Card>
      ) : (
        <Col className='box'>
          <br />
          <Skeleton classes='title width-100 skeleton-title' />
          <Skeleton classes='title width-100 skeleton-title' />
          <Skeleton classes='title width-25 skeleton-title' />
          <Skeleton classes='title width-25 skeleton-title' />
        </Col>
      )}
      <br />
    </div>
  );
};
export default SkeletonUserEditScreen;
