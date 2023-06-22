import React from 'react';
import Skeleton from './Skeleton';
import { Card, Row } from 'react-bootstrap';

const SkeletonUserListScreen = () => {
  const isMobile = window.innerWidth <= 768; // Set your mobile breakpoint here
  return (
    <div>
      <br />
      {isMobile ? (
        <Card className='mobile-image-card'>
          <Skeleton classes='title width-100 skeleton-title' />
        </Card>
      ) : (
        <Row className='box'>
          <Skeleton classes='title width-100 skeleton-title mb-3' />
        </Row>
      )}
      <br />
    </div>
  );
};

export default SkeletonUserListScreen;
