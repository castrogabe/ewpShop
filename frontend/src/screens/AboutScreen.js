import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <>
      <div className='content'>
        <br />
        <Row>
          <Col md={6}>
            <Card>
              <img
                src='/images/turning.GIF'
                className='img-responsive'
                alt='Gabe'
              />
            </Card>
          </Col>
          <Col md={6}>
            <div className='box'>
              <h2>Handcrafted</h2>
              <p>
                Hi, I'm Gabe. I'm internationally known for my pen segmenting
                techniques and segmenting videos that have been sold to hundreds
                of pen turners all over the world. Each pen comes with a free
                refill. Like us on{' '}
                <a href='https://www.facebook.com/Exotic-Wood-Pen-460928980709091/?view_public_for=460928980709091'>
                  <span className='facebook'>Facebook</span>
                </a>{' '}
                and Subscribe to my{' '}
                <a href='https://www.youtube.com/channel/UCVdwaT1LF4iv6q5okes29tA'>
                  <span className='youtube'>YouTube</span>
                </a>{' '}
                Exotic Wood Pen channel.
              </p>

              <h6>
                <a href='https://www.facebook.com/Exotic-Wood-Pen-460928980709091/?view_public_for=460928980709091'>
                  <span className='facebook'>Facebook</span>
                </a>{' '}
              </h6>
              <h6>
                <a href='https://www.youtube.com/channel/UCVdwaT1LF4iv6q5okes29tA'>
                  <span className='youtube'>YouTube</span>
                </a>{' '}
              </h6>
            </div>

            <div className='box'>
              <h2>Segmenting Videos</h2>
              <p>
                I spent over six months designing the jigs and making the pens
                and editing the videos. These are long videos, complete step by
                step process, basic tools and two jigs used to make all of the
                pens, also wedge dimensions shown of actual wedge. Over 7 hours
                of video instruction combined in Part 1,2,3. Sorry no fancy
                graphics or music, just wood and tools. You can view the
                SEGMENTING VIDEOS SERIES on
                <a href='https://www.youtube.com/watch?v=Wfxa4WPEq1k'>
                  {' '}
                  <span className='youtube'> Youtube</span>
                </a>{' '}
                and watch for free with ads or you can purchase them, after
                purchasing and downloading videos please back up videos to a
                flash drive.
              </p>
            </div>
            <div className='box'>
              <h2>Drill Press Segmenting Wedge Dimensions</h2>
              <img
                src='/images/wedge.png'
                className='img-responsive'
                alt='wedge'
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='box'>
              <h2>Exotic Woods, Acrylics, Ebonite Materials.</h2>
              <p>
                Bacote, Cocobolo, Lacewood, Purpleheart, Curly Maple, Olive,
                Zebra, Zircote, Ebony, Tulip, and Wine barrel Oak, Bethlehem
                Olive Wood from 2000 year old trees and 30,000 to 50,000 year
                old Ancient Kauri Wood unearthed in New Zealand, each pen comes
                with Certificate of Authenticity.
              </p>
            </div>
            <div className='box'>
              <h2>Steampunk Pen.</h2>
              <p>
                Bring those broken heirloom watches out of the closet and
                transform them into writing works of art with a close family
                history. Cast into Acyrlic resin hand turned and wet sanded
                using Micro Mesh from 1500 to 12000 grit. Some have Carbon Fibre
                or choose a favorite color background to further customize the
                look you want, also add your own charms for that one of a kind
                special look. 5 to 8 watches used to create each handcrafted
                pen.
              </p>
            </div>
            <div className='box'>
              <h2>Bespoke Ebonite Fountain Pens</h2>
              <p>
                Made from 12" Ebonite Rods not kits using old world techniques
                with Jowo #6 Nibs and Schmidt Converters/refill cartridges.
                Clips are made from recycled 50 caliber cartridges. Either 2 or
                3 start 14MM thread.
              </p>
            </div>
            <div className='box'>
              <h2>My Woodworking Experience So Far...</h2>
              <p>
                I have been working with wood for most of my life in one way or
                another, being raised by my Grandparents who grew up during the
                Depression and always made due with what they had, and we built
                our own house so I learned how to use basic tools growing up. I
                have been making Exotic Wood Pens for close to fifteen years,
                and working on the lathe for over twenty years in my modest two
                car garage shop in Southern California.
                <br />
                After getting back into woodworking and collecting antique
                woodworking tools I picked up a Popular Woodworking Magazine
                that featured Sam Maloof's new shop, up until that time I had
                seen a book for sale in a antique shop and I saw one of his
                chairs in a Museum, to my surprise he was right here in Southern
                California, so in 2003 my wife surprised me when she took me to
                see the Sam and Alfreda Museum in Alta Loma California. that
                visit changed the way I looked at woodworking by combining form,
                and function along with combining hard lines, and soft lines I
                can create art that is functional that invites you to touch,
                admire and most of all enjoy.
              </p>
            </div>
          </Col>
        </Row>

        <hr />
        <br />
        <Row>
          <Col md={6}>
            <Card>
              <img
                src='/images/Sam.jpg'
                className='img-responsive'
                alt='Sam and Gabe'
              />
            </Card>
          </Col>
          <Col md={6}>
            <div className='box'>
              <h2>Volunteered a Docent at Sam Maloof's Historic Museum</h2>
              <p>
                My Exotic Wood Pens, their shape inspired by legendary wood
                worker Sam Maloof. My favorite chair is the Curly Maple and
                Ebony Rocking Chair, I created the Curly Maple and Ebony Pen
                with hard and soft lines. My mission is to let the wood speak
                for itself, I hand select all the woods I like to use, and still
                offer a variety of styles of pens with a variety of finishes
                like Chrome, Titanium, and Black Chrome. They combine form and
                function with comfort, ease of use, the bamboo like shape of the
                Cigar Pen cradles in the fingers and allows for a relaxed
                writing experience, eliminating hand fatigue during writing.
              </p>
            </div>
          </Col>
        </Row>
        <br />
      </div>
    </>
  );
};

export default About;
