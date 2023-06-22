import React from 'react';
import Skeleton from './Skeleton';
import { Col, Row } from 'react-bootstrap';

const SkeletonProductMagScreen = () => {
  const isMobile = window.innerWidth <= 768; // Set your mobile breakpoint here
  return (
    <>
      {isMobile ? (
        <div className='content'>
          {/* mobile view */}
          <br />
          <Row className='box'>
            <Skeleton classes='title width-100 skeleton-title' />
            <Skeleton classes='title width-100 skeleton-title' />
          </Row>
          <Row>
            <div className='container'>
              <Row>
                <Skeleton classes='img-large' />
                <Skeleton classes='img-thumbnail' />
                <Skeleton classes='img-thumbnail' />
                <Skeleton classes='img-thumbnail' />
              </Row>
            </div>

            <br />

            <Col md={6}>
              <div className='box'>
                <Skeleton classes='title width-50 skeleton-title' />
                <Skeleton classes='title width-50 skeleton-title' />
                <Skeleton classes='title width-25 skeleton-title' />
                <Skeleton classes='text width-50 skeleton-text' />
                <Skeleton classes='text width-25 skeleton-text' />
                <Skeleton classes='text width-100 skeleton-text' />
              </div>
              <br />
              <div className='box'>
                <Skeleton classes='title width-50 skeleton-title' />
                <Skeleton classes='title width-50 skeleton-title' />
                <Skeleton classes='text width-25 skeleton-text' />
                <Skeleton classes='text width-25 skeleton-text' />
                <Skeleton classes='button width-25 skeleton-button' />
              </div>
            </Col>
          </Row>
          <br />
          <br />
          <Row md={12} className='box'>
            <Skeleton classes='title width-25 skeleton-title' />
            <Skeleton classes='title width-100 skeleton-title' />
            <Skeleton classes='title width-100 skeleton-title' />
            <Skeleton classes='title width-100 skeleton-title' />
            <Skeleton classes='button width-25 skeleton-button' />
          </Row>
          <br />
        </div>
      ) : (
        <div className='content'>
          {/* Skeleton desktop view */}
          <br />
          <Row className='box'>
            <Skeleton classes='title width-100 skeleton-title' />
            <Skeleton classes='title width-100 skeleton-title' />
          </Row>
          <br />
          <Row md={12}>
            <div className='container col-6'>
              <Col className='left-col'>
                <Skeleton classes='img-thumbnail' />
                <Skeleton classes='img-thumbnail' />
                <Skeleton classes='img-thumbnail' />
                <Skeleton classes='img-thumbnail' />
              </Col>
              <Col className='right-col'>
                <Skeleton classes='img-large' />
                <Skeleton classes='text width-50 skeleton-text' />
              </Col>
            </div>

            <Col md={6}>
              <div className='box'>
                <Skeleton classes='title width-50 skeleton-title' />
                <Skeleton classes='title width-50 skeleton-title' />
                <Skeleton classes='title width-25 skeleton-title' />
                <Skeleton classes='text width-50 skeleton-text' />
                <Skeleton classes='text width-25 skeleton-text' />
                <Skeleton classes='text width-100 skeleton-text' />
              </div>
              <br />
              <div className='box'>
                <Skeleton classes='title width-50 skeleton-title' />
                <Skeleton classes='title width-50 skeleton-title' />
                <Skeleton classes='text width-25 skeleton-text' />
                <Skeleton classes='text width-25 skeleton-text' />
                <Skeleton classes='button width-25 skeleton-button' />
              </div>
            </Col>
          </Row>
          <br />
          <br />
          <Row md={12} className='box'>
            <Skeleton classes='title width-25 skeleton-title' />
            <Skeleton classes='title width-100 skeleton-title' />
            <Skeleton classes='title width-100 skeleton-title' />
            <Skeleton classes='title width-100 skeleton-title' />
            <Skeleton classes='button width-25 skeleton-button' />
          </Row>
          <br />
        </div>
      )}
    </>
  );
};

export default SkeletonProductMagScreen;
