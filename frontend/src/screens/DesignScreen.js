import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const DesignScreen = () => {
  return (
    <>
      <div className='content'>
        <LazyLoad>
          <Helmet>
            <title>Design Screen</title>
          </Helmet>
          <br />
          <div className='box'>
            <h2>Customized Pens - Your Personal Style</h2>
            <p className='mt-3'>
              Elevate your writing experience with a personalized pen from
              exoticwoodpen. Design your own pen by choosing from various types,
              colors, and more to craft the perfect writing instrument. Each pen
              includes an ink cartridge converter or cartridge. For enthusiasts
              of fine nibs, we offer a Fine JoWo #6 option.
            </p>

            <br />

            <p>
              Explore our selection of pen styles, and if you need any
              assistance or have special requests, feel free to reach out to us.
              We understand that navigating this page can be overwhelming!
              Additionally, we offer Ballpoint and Rollerball pens to suit your
              preferences.
            </p>
          </div>

          {/* col on the right */}
          <Row>
            <Col md={6}>
              <div className='box'>
                <h2>Bespoke Pens</h2>
                <p>
                  Elevate your writing experience with a personalized pen from
                  exoticwoodpen. Design your own pen by choosing from various
                  types, colors, and more to craft the perfect writing
                  instrument. Each pen includes an ink cartridge converter or
                  cartridge. For enthusiasts of fine nibs, we offer a Fine JoWo
                  #6 option.
                </p>
              </div>
              <div className='box'>
                <h2>Bespoke Pen Videos</h2>
                <p>
                  Explore my YouTube channel by clicking on the link below.
                  Delve into a variety of pen-related videos where each Bespoke
                  Pen I craft is showcased. Witness the intricate process of
                  creating a Bespoke pen through step-by-step videos. If you
                  choose to have a Bespoke pen made, you can follow its journey
                  to fruition in a detailed video on my channel.
                  <a
                    href='https://www.youtube.com/channel/UCVdwaT1LF4iv6q5okes29tA'
                    className='youtubeIcon'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <span className='youtube'> YouTube</span>
                  </a>{' '}
                </p>
              </div>

              <div className='box'>
                <h1>Contact Us</h1>
                <Link to='/contact' className='productEmail'>
                  Questions about a pen? Click me!
                </Link>
              </div>

              <div className='box'>
                <h2>Exotic Woods, Acrylics, Ebonite Materials.</h2>
                <p>
                  Bacote, Cocobolo, Lacewood, Purpleheart, Curly Maple, Olive,
                  Zebra, Zircote, Ebony, Tulip, and Wine barrel Oak, Bethlehem
                  Olive Wood from 2000 year old trees and 30,000 to 50,000 year
                  old Ancient Kauri Wood unearthed in New Zealand, each pen
                  comes with Certificate of Authenticity.
                </p>
              </div>

              <div>
                <Card>
                  <img
                    src='/images/fav.jpeg'
                    className='img-responsive'
                    alt='Fav'
                    loading='lazy'
                  />
                </Card>
              </div>
            </Col>

            {/* col on the left */}
            <Col md={6}>
              <div>
                <Row>
                  <Col className='box'>
                    <h4>Design Your Dream Pen: Cap, Body, and Nib</h4>
                    <p>
                      <strong>Cap, Body, and Nib Customization</strong>
                    </p>
                    <p>
                      Take command of your pen's design by choosing from a
                      selection of premium materials. Crafted from Ebonite,
                      Acrylics, and Exotic Woods, our pens exude luxury. For an
                      added touch of sophistication, all Exotic Wood Bespoke
                      Pens come sleeved with Ebonite, ensuring a distinctive and
                      high-quality writing instrument. Let your imagination run
                      wild as you design the pen of your dreams.
                    </p>
                    <p>
                      The finial of the cap offers options of being flat,
                      tapered, or concave.
                    </p>
                    <p>
                      The Cap and Body, each approximately 3" in length, total
                      6". Thread options include a standard 14mm triple-start
                      thread or a double-start 14mm thread for segmented bespoke
                      pens.
                    </p>
                    <p>
                      The Jowo Nib, a standard Fine #6 Nib, can be customized to
                      your preference. Choose from Stainless Steel or Rosetta
                      Gold Finish through special order.
                    </p>

                    <p>
                      <strong>Cap Style Options</strong>
                    </p>
                    <p>
                      Discover a variety of cap options, including Straight,
                      Tapered, or Rounded designs.
                    </p>
                    <p>
                      The finial of the cap provides additional choices, with
                      options for it being flat, tapered, or concave. Tailor
                      your pen's cap to suit your unique style and preferences.
                    </p>
                  </Col>
                  <Col>
                    <img
                      src='/images/straight.png'
                      className='img-responsive'
                      alt='straight'
                      loading='lazy'
                    />
                    <br />
                    <img
                      src='/images/Sleved.png'
                      className='img-responsive'
                      alt='sleved'
                      loading='lazy'
                    />
                  </Col>
                </Row>
              </div>

              <br />

              <div>
                <Row>
                  <Col className='box'>
                    <h4>
                      Elevate Your Fountain Pen with Custom Section Styles
                    </h4>
                    <p>
                      <strong>Experience the Bespoke Section</strong>
                    </p>
                    <p>
                      Embrace the opportunity to personalize your fountain pen
                      further with our diverse Section Style Options. While the
                      default section material matches the body, you have the
                      flexibility to choose a Classic, Concave, or Tapered
                      design. Customize the length, opting for either 7/8" or
                      1", to create a pen that truly reflects your preferences.
                    </p>
                  </Col>
                  <Col>
                    <h4 className='box'>
                      Classic
                      <img
                        src='/images/classic.jpeg'
                        className='img-responsive'
                        alt='classic'
                        loading='lazy'
                      />
                    </h4>
                    <h4 className='box'>
                      Concave
                      <img
                        src='/images/concave.jpeg'
                        className='img-responsive'
                        alt='classic'
                        loading='lazy'
                      />
                    </h4>
                    <h4 className='box'>
                      Tapered
                      <img
                        src='/images/tapered.jpeg'
                        className='img-responsive'
                        alt='classic'
                        loading='lazy'
                      />
                    </h4>
                  </Col>
                </Row>
              </div>

              <br />

              <div>
                <Row>
                  <Col className='box'>
                    <h4>Enhance Your Pen's Style with the Perfect Clip</h4>
                    <p>
                      <strong>Discover the Ideal Clip</strong>
                    </p>
                    <p>
                      Elevate the design of your pen by choosing the perfect
                      clip. Explore a variety of options such as a recycled 50
                      caliber cartridge, a miniature spoon, a sleek steel clip,
                      or an intricately crafted dovetailed steel and brass clip
                      to add a touch of elegance to your pen's aesthetic.
                    </p>
                  </Col>
                  <Col>
                    <img
                      src='/images/clip.png'
                      className='img-responsive'
                      alt='spoon'
                      loading='lazy'
                    />
                    <br />
                    <img
                      src='/images/50clip.png'
                      className='img-responsive'
                      alt='50'
                      loading='lazy'
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <hr />

          <Row>
            <Col md={3}>
              <Card>
                <img
                  src='/images/70a.png'
                  className='img-responsive'
                  alt='Blues'
                  loading='lazy'
                />
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <img
                  src='/images/71a.png'
                  className='img-responsive'
                  alt='Spy'
                />
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <img
                  src='/images/72a.png'
                  className='img-responsive'
                  alt='Shifting Sands'
                  loading='lazy'
                />
              </Card>
            </Col>

            <Col md={3}>
              <Card>
                <img
                  src='/images/73a.png'
                  className='img-responsive'
                  alt='Redwood'
                  loading='lazy'
                />
              </Card>
            </Col>

            <Col md={3}>
              <Card>
                <img
                  src='/images/74a.png'
                  className='img-responsive'
                  alt='Redemption'
                  loading='lazy'
                />
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <img
                  src='/images/76a.png'
                  className='img-responsive'
                  alt='Nakashima'
                  loading='lazy'
                />
              </Card>
            </Col>

            <Col md={3}>
              <Card>
                <img
                  src='/images/77a.png'
                  className='img-responsive'
                  alt='Mini Pocket'
                  loading='lazy'
                />
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <img
                  src='/images/79a.png'
                  className='img-responsive'
                  alt='Schizophrenic'
                  loading='lazy'
                />
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <img
                  src='/images/80a.png'
                  className='img-responsive'
                  alt='Back In Black'
                  loading='lazy'
                />
              </Card>
            </Col>

            <Col md={3}>
              <Card>
                <img
                  src='/images/82a.png'
                  className='img-responsive'
                  alt='Schizophrenic Rollerball'
                  loading='lazy'
                />
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <img
                  src='/images/83a.png'
                  className='img-responsive'
                  alt='Model JEF'
                  loading='lazy'
                />
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <img
                  src='/images/85a.png'
                  className='img-responsive'
                  alt='Illusion'
                  loading='lazy'
                />
              </Card>
            </Col>
          </Row>
          <br />
        </LazyLoad>
      </div>
    </>
  );
};

export default DesignScreen;
