import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div>
        <Row>
          <Col md={4}>
            Stay in touch
            <div className='socialIcon'>
              <ul className='list-unstyled'>
                <li>
                  <a
                    href='https://www.facebook.com/Exotic-Wood-Pen-460928980709091'
                    className='facebookIcon'
                    target='_blank'
                    rel='noopener'
                    results='noreferrer'
                  >
                    <i className='fab fa-facebook'></i> Facebook "Exotic Wood
                    Pen"
                  </a>
                </li>

                <li>
                  <a
                    href='https://www.facebook.com/profile.php?id=100045945043682'
                    className='facebookIcon'
                    target='_blank'
                    rel='noopener'
                    results='noreferrer'
                  >
                    <i className='fab fa-facebook'></i> Facebook "Gilded Age
                    Pens"
                  </a>
                </li>

                <li>
                  <a
                    href='https://www.youtube.com/channel/UCVdwaT1LF4iv6q5okes29tA'
                    className='youtubeIcon'
                    target='_blank'
                    rel='noopener'
                    results='noreferrer'
                  >
                    <i className='fab fa-youtube'></i> YouTube
                  </a>
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
              <ul className='list-unstyled'>
                <Link to='/contact' className='email'>
                  {' '}
                  <i className='fa fa-envelope'></i> Contact Us
                </Link>
                <li>
                  <a href='mailto:exoticwoodpen@gmail.com' className='email'>
                    <i className='fa fa-envelope'></i> Email Me via gmail
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>

      <hr className='hrLine' />

      <div>
        <Row>
          <Col className='text-center mt-3'>
            &copy;{new Date().getFullYear()} ExoticWoodPen
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
