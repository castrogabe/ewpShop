import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Skeleton from './Skeleton';

const SkeletonDashboardScreen = () => {
  const isMobile = window.innerWidth <= 768;

  return (
    <>
      <div>
        {/* Mobile View */}
        {isMobile && (
          <>
            <Col>
              <Row className='box'>
                <Col>
                  <Skeleton classes='title width-25 skeleton-title' />
                  <Skeleton classes='title width-25 skeleton-title' />
                </Col>
              </Row>
              <Row className='box'>
                <Col>
                  <Skeleton classes='title width-25 skeleton-title' />
                  <Skeleton classes='title width-25 skeleton-title' />
                </Col>
              </Row>
              <Row className='box'>
                <Col>
                  <Skeleton classes='title width-25 skeleton-title' />
                  <Skeleton classes='title width-25 skeleton-title' />
                </Col>
              </Row>
              <Row className='box'>
                <Col>
                  <Skeleton classes='title width-25 skeleton-title' />
                  <Skeleton classes='title width-25 skeleton-title' />
                </Col>
              </Row>
            </Col>

            <Skeleton classes='title width-25 skeleton-title' />

            <Row className='box'>
              <Skeleton classes='text width-100 skeleton-text' />
              <Skeleton classes='text width-100 skeleton-text' />
              <Skeleton classes='text width-100 skeleton-text' />
              <Skeleton classes='text width-100 skeleton-text' />
              <Skeleton classes='text width-100 skeleton-text' />
              <Skeleton classes='text width-100 skeleton-text' />
            </Row>

            <Skeleton classes='title width-25 skeleton-title' />
            <Row className='box'>
              <Col className='mobile-col'>
                <Skeleton classes='pie mobile-pie' />
              </Col>
              <Col className='mobile-col'>
                <Skeleton classes='text width-50 skeleton-text' />
                <Skeleton classes='text width-50 skeleton-text' />
                <Skeleton classes='text width-50 skeleton-text' />
                <Skeleton classes='text width-50 skeleton-text' />
                <Skeleton classes='text width-50 skeleton-text' />
                <Skeleton classes='text width-50 skeleton-text' />
              </Col>
            </Row>
          </>
        )}

        {/* Desktop View */}
        {!isMobile && (
          <>
            <Row md={12}>
              <Col md={3} className='box'>
                <Skeleton classes='title width-25 skeleton-title' />
                <Skeleton classes='title width-25 skeleton-title' />
              </Col>
              <Col md={3} className='box'>
                <Skeleton classes='title width-25 skeleton-title' />
                <Skeleton classes='title width-25 skeleton-title' />
              </Col>
              <Col md={3} className='box'>
                <Skeleton classes='title width-25 skeleton-title' />
                <Skeleton classes='title width-25 skeleton-title' />
              </Col>
              <Col md={3} className='box'>
                <Skeleton classes='title width-25 skeleton-title' />
                <Skeleton classes='title width-25 skeleton-title' />
              </Col>
            </Row>

            <Skeleton classes='title width-25 skeleton-title' />

            <Row className='box'>
              <Skeleton classes='text width-100 skeleton-text' />
              <Skeleton classes='text width-100 skeleton-text' />
              <Skeleton classes='text width-100 skeleton-text' />
              <Skeleton classes='text width-100 skeleton-text' />
              <Skeleton classes='text width-100 skeleton-text' />
              <Skeleton classes='text width-100 skeleton-text' />
            </Row>

            <Skeleton classes='title width-25 skeleton-title' />
            <Row className='box'>
              <Col className='left-col'>
                <Skeleton classes='pie' />
              </Col>
              <Col className='right-col'>
                <Skeleton classes='text width-50 skeleton-text' />
                <Skeleton classes='text width-50 skeleton-text' />
                <Skeleton classes='text width-50 skeleton-text' />
                <Skeleton classes='text width-50 skeleton-text' />
                <Skeleton classes='text width-50 skeleton-text' />
                <Skeleton classes='text width-50 skeleton-text' />
              </Col>
            </Row>
          </>
        )}
        <br />
      </div>
    </>
  );
};

export default SkeletonDashboardScreen;
