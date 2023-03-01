import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <Row>
        <Col md={4}>
          Stay in touch
          <div className='socialIcon'>
            <ul className='list-unstyled'>
              <li>
                <Link
                  to='https://www.facebook.com/Exotic-Wood-Pen-460928980709091'
                  className='facebookIcon'
                >
                  <i className='fab fa-facebook'></i> Facebook
                </Link>
              </li>

              <li>
                <Link
                  to='https://www.youtube.com/channel/UCVdwaT1LF4iv6q5okes29tA'
                  className='youtubeIcon'
                >
                  <i className='fab fa-youtube'></i> YouTube
                </Link>
              </li>
            </ul>
          </div>
        </Col>

        <Col md={4}>
          Get To Know Us
          <div className='socialIcon'>
            <ul className='list-unstyled'>
              <li>
                <Link to='/about' className='email'>
                  {' '}
                  <i className='fa fa-info'></i> About Us
                </Link>
              </li>
              <li>
                <Link to='/jig' className='email'>
                  {' '}
                  <i className='fa fa-info'></i> Published Popular Woodworking
                  Jigs
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={4}>
          Pen Questions
          <div className='socialIcon'>
            <Link to='/contact' className='email'>
              <i className='fa fa-envelope'></i> Contact Us
            </Link>
          </div>
        </Col>
      </Row>

      <hr className='hrLine' />

      <Row>
        <Col className='text-center mt-3'>
          &copy;{new Date().getFullYear()} ExoticWoodPen
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
