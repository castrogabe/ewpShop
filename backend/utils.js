import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// Function to calculate the total quantity of items in the order
const calculateTotalQuantity = (order) => {
  return order.orderItems.reduce((total, item) => total + item.quantity, 0);
};

export const baseUrl = () =>
  process.env.BASE_URL
    ? process.env.BASE_URL
    : process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000'
    : 'https://yourdomain.com';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

// Create a transporter object using SMTP transport
export const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'smtp.gmail.com'
  port: 587,
  secure: false, // set to true if using SSL/TLS
  auth: {
    user: process.env.NODE_USER,
    pass: process.env.NODE_PASSWORD,
  },
});

// Send email receipt
export const payOrderEmailTemplate = (order) => {
  // Calculate the total quantity
  const totalQuantity = calculateTotalQuantity(order);

  const formattedDate = `${(order.createdAt.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${order.createdAt
    .getDate()
    .toString()
    .padStart(2, '0')}-${order.createdAt.getFullYear()}`;

  return `<h1>Thanks for shopping with exoticwoodpen.com, we will send a confirmation when your order ships</h1>
    <p>
    Hi ${order.user.name},</p>
    <p>We are processing your order.</p>
    <h2>Purchase Order ${order._id} (${formattedDate})</h2>
    <table>
      <thead>
        <tr>
          <td><strong align="right">Item's and Price</strong></td>
        </tr>
      </thead>
      <tbody>
        ${order.orderItems
          .map(
            (item) => `
              <tr>
                <td><img src="${item.image}" alt="${
              item.name
            }" width="50" height="50" /></td>
                <td>${item.name}</td>
                <td align="center">Qty: ${item.quantity}</td>
                <td align="right"> $${item.price.toFixed(2)}</td>
              </tr>
            `
          )
          .join('\n')}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">Total Quantity:</td>
          <td align="right"> ${totalQuantity}</td>
        </tr>
        <tr>
          <td colspan="2">Items Price:</td>
          <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="2">Tax Price:</td>
          <td align="right"> $${order.taxPrice.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="2">Shipping Price:</td>
          <td align="right"> $${order.shippingPrice.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="2"><strong>Total Price:</strong></td>
          <td align="right"><strong> $${order.totalPrice.toFixed(
            2
          )}</strong></td>
        </tr>
        <tr>
          <td colspan="2">Payment Method:</td>
          <td align="right">${order.paymentMethod}</td>
        </tr>
      </tfoot>
    </table>
    <h2>Shipping address</h2>
    <p>
      ${order.shippingAddress.fullName},<br/>
      ${order.shippingAddress.address},<br/>
      ${order.shippingAddress.city},<br/>
      ${order.shippingAddress.country},<br/>
      ${order.shippingAddress.postalCode}<br/>
    </p>
    <hr/>
    <p>
      Thanks for shopping with us.
    </p>
  `;
};
// end email receipt

// ************************* send confirmation email *************************

export const shipOrderEmailTemplate = (order) => {
  // console.log('Order:', order);

  // Calculate the total quantity
  const totalQuantity = calculateTotalQuantity(order);

  const deliveryDays = order.orderItems[0]?.deliveryDays || 'N/A';
  const carrierName = order.orderItems[0]?.carrierName || 'N/A';
  const trackingNumber = order.orderItems[0]?.trackingNumber || 'N/A';

  const formattedDate = `${(order.createdAt.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${order.createdAt
    .getDate()
    .toString()
    .padStart(2, '0')}-${order.createdAt.getFullYear()}`;

  return `<h1>Thanks for shopping with exoticwoodpen.com</h1>
    <p>
    Hi ${order.user.name},</p>
    <p>Great News, your order has been shipped, and will arrive within <strong>${
      order.deliveryDays
    }</strong> days.</p>
    <p>Your package shipped <strong>${order.carrierName}.</strong></p>
    <p>Your tracking number is: <strong>${order.trackingNumber}</strong></p>
    <p>Please email me at exoticwoodpen@gmail.com if you have any questions.</p>
    
    <h2>Purchase Order ${order._id} (${formattedDate})</h2>
    <h2>Shipped Order ${order._id} (${formattedDate})</h2>
    <table>
      <thead>
        <tr>
          <td><strong align="right">Item's and Price</strong></td>
        </tr>
      </thead>
      <tbody>
        ${order.orderItems
          .map(
            (item) => `
              <tr>
                <td><img src="${item.image}" alt="${
              item.name
            }" width="50" height="50" /></td>
                <td>${item.name}</td>
                <td align="center">Qty: ${item.quantity}</td>
                <td align="right"> $${item.price.toFixed(2)}</td>
              </tr>
            `
          )
          .join('\n')}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">Total Quantity:</td>
          <td align="right"> ${totalQuantity}</td>
        </tr>
        <tr>
          <td colspan="2">Items Price:</td>
          <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="2">Tax Price:</td>
          <td align="right"> $${order.taxPrice.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="2">Shipping Price:</td>
          <td align="right"> $${order.shippingPrice.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="2"><strong>Total Price:</strong></td>
          <td align="right"><strong> $${order.totalPrice.toFixed(
            2
          )}</strong></td>
        </tr>
        <tr>
          <td colspan="2">Payment Method:</td>
          <td align="right">${order.paymentMethod}</td>
        </tr>
      </tfoot>
    </table>
    <h2>Shipping address</h2>
    <p>
      ${order.shippingAddress.fullName},<br/>
      ${order.shippingAddress.address},<br/>
      ${order.shippingAddress.city},<br/>
      ${order.shippingAddress.country},<br/>
      ${order.shippingAddress.postalCode}<br/>
    </p>
    <hr/>
    <p>
      Thanks for shopping with us.
    </p>
  `;
};

// Shipping confirmation email thru nodemailer
export const sendShippingConfirmationEmail = async (req, order) => {
  const customerEmail = order.user.email;
  const shippingConfirmationDetails = shipOrderEmailTemplate(order);

  // Create email content for shipping confirmation
  const emailContent = {
    from: 'exoticwoodpen@gmail.com',
    to: customerEmail,
    subject: 'Shipping Confirmation from exoticwoodpen', // email subject
    html: shippingConfirmationDetails,
  };

  try {
    // Send the shipping confirmation email using the `transporter`
    const info = await transporter.sendMail(emailContent);

    // console.log('Shipping confirmation email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending shipping confirmation email:', error);
  }
};
