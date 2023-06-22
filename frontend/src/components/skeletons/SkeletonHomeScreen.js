import React from 'react';
import Skeleton from './Skeleton';
import { Card, Col } from 'react-bootstrap';

function SkeletonHomeScreen() {
  const isMobile = window.innerWidth <= 768; // Set your mobile breakpoint here

  return (
    <>
      {isMobile ? (
        <Card className='mobile-image-card'>
          {/* mobile view */}
          <Col className='left-col'>
            <Skeleton classes='card-img-top' />
          </Col>
          <Col className='right-col'>
            <Skeleton classes='title width-75 skeleton-title' />
            <Skeleton classes='title width-75 skeleton-title' />
            <Skeleton classes='title width-75 skeleton-title' />
            <Skeleton classes='text width-50 skeleton-text' />
            <Skeleton classes='text width-25 skeleton-text' />
            <Skeleton classes='text width-50 skeleton-button' />
          </Col>
        </Card>
      ) : (
        <Col>
          <Card>
            {/* desktop skeleton */}
            <Skeleton classes='image width-100' />
            <br />
            <Skeleton classes='title width-75 skeleton-title' />
            <Skeleton classes='title width-75 skeleton-title' />
            <Skeleton classes='title width-75 skeleton-title' />
            <Skeleton classes='text width-50 skeleton-text' />
            <Skeleton classes='text width-25 skeleton-text' />
            <Skeleton classes='text width-50 skeleton-button' />
          </Card>
        </Col>
      )}
    </>
  );
}

export default SkeletonHomeScreen;
