import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Gabe',
      email: 'exoticwoodpen@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Steampunk Emperor 1',
      slug: 'Emperor #1',
      category: 'Bespoke Pens',
      image: '/images/1a.png', // 679px × 829px
      price: 400,
      countInStock: 1,
      style: 'Steampunk Fountain Pen',
      finish: 'Titanium',
      rating: 4.5,
      numReviews: 10,
      description:
        'Handmade Steampunk Titanium Finish Ingersoll Yankee Pocket Watch Face over Carbon Fiber, Emperor Kit with Titanium finish, gears & parts from pocket watches and wrist watches used to make this Steampunk Pen, Fine Jowo #6 two tone steel nib and Schmidt style converter for easy refilling.',
    },
    {
      name: 'Steampunk Pink Convertible #9',
      slug: 'Pink Convertible #9',
      category: 'Steampunk Pens',
      image: '/images/9a.png', // 679px × 829px
      price: 200,
      countInStock: 1,
      style: 'Steampunk Rollerball',
      finish: 'Chrome Finish',
      rating: 4.5,
      numReviews: 10,
      description:
        'Handmade Steampunk Chrome Finish Americana and Bunrus Swiss Watch Faces over pink paint with small cross, gears are real wrist watch parts used to make this Steampunk Pen, Parker Ink Refill, comes with a free refill.',
    },

    {
      name: 'Segmented Desk Pen #17',
      slug: ' Segmented #17',
      category: 'Segmented Pens',
      image: '/images/17a.png', // 679px × 829px
      price: 200,
      countInStock: 1,
      style: 'Segmented Rollerball',
      finish: 'Chrome Finish',
      rating: 4.5,
      numReviews: 10,
      description:
        'Handmade closed end Churchill Desk Pen, Cap woods are Ebony with Maple Wood Dots and Figured Walnut and Maple Celtic Knot with Black and White Wood Veneers, the Has Figured Walnut and Maple Scallops as well as Ebony sides and Figured Maple for the Center and Black and White Wood Veneers, Fine Schmidt Style Ceramic Roller Refill, comes with a free refill.',
    },
    {
      name: 'Segmented Cigar #22',
      slug: 'Segmented #22',
      category: 'Steampunk Pens',
      image: '/images/22a.png', // 679px × 829px
      price: 100,
      countInStock: 1,
      style: 'Segmented Rollerball',
      finish: 'Chrome Finish',
      rating: 4.5,
      numReviews: 10,
      description:
        'Handmade Cigar Chrome Finish, woods are Bacote for the sides and Bloodwood in the middle, Purpleheart band, Paduke scallops, and Walnut Burl Medallions, black and White Wood Veneers, Parker refill, comes with a free refill.',
    },

    {
      name: 'Part 1 Video',
      slug: 'Part 1',
      category: 'Segmenting Video',
      image: '/images/50a.png', // 679px × 829px
      price: 15,
      countInStock: 1,
      style: 'Video Download',
      finish: 'MP4 Download',
      rating: 4.5,
      numReviews: 10,
      description: 'Part 1, 2 Pens, 3 hours 3.6G, MP4 Download',
    },
    {
      name: 'Part 1, 2, and 3 Video',
      slug: 'Part 1, 2, 3 bundle',
      category: 'Segmenting Video',
      image: '/images/54a.png', // 679px × 829px
      price: 25,
      countInStock: 1,
      style: 'Video Download',
      finish: 'MP4 Download',
      rating: 4.5,
      numReviews: 10,
      description: 'Part 1-3 Bundle, 7.8 hours 8.34gb, MP4 Download',
    },

    {
      name: 'Cigar Wine Barrel Oak #60',
      slug: 'Wine Barrel Oak',
      category: 'Kit Pens',
      image: '/images/60a.png', // 679px × 829px
      price: 50,
      countInStock: 1,
      style: 'Cigar Rollerball',
      finish: 'Black Chrome Finish',
      rating: 4.5,
      numReviews: 10,
      description:
        'Handmade Cigar, Black Chrome Finish, Wine Barrel Oak Wood Body, Parker refill, comes with a free refill.',
    },
    {
      name: 'Cigar Lacewood #61',
      slug: 'Lacewood',
      category: 'Steampunk Pens',
      image: '/images/61a.png', // 679px × 829px
      price: 50,
      countInStock: 1,
      style: 'Cigar Rollerball',
      finish: 'Black Chrome finish',
      rating: 4.5,
      numReviews: 10,
      description:
        'Handmade Cigar, Black Chrome Finish, Lacewood Wood Body, Parker refill, comes with a free refill.',
    },

    {
      name: 'Blues',
      slug: 'Blues',
      category: 'Bespoke Pens',
      image: '/images/70a.png', // 679px × 829px
      price: 250,
      countInStock: 1,
      style: 'Bespoke Fountain Pen',
      finish: 'Blue/Green Ebonite',
      rating: 4.5,
      numReviews: 10,
      description:
        'The Blues(blue/green ebonite), Bespoke Ebonite Fountain Pen, bottom unscrews for converter access, Gold Jowo #6 nib, Schmidt style converter, brass clip made from 50 caliber cartridge.',
    },
    {
      name: 'Shifting Sands',
      slug: 'Shifting Sands',
      category: 'Bespoke Pens',
      image: '/images/72a.png', // 679px × 829px
      price: 200,
      countInStock: 1,
      style: 'Bespoke Fountain Pen',
      finish: 'Exotic Wood',
      rating: 4.5,
      numReviews: 10,
      description:
        'Japanese Ebonite Sleeved, Bacote Wood Body and Cap, Parker Rollerball, brass clip made from 50 caliber cartridge.',
    },
  ],
};
export default data;
