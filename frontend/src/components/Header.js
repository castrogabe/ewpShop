import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Badge, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { getError } from '../utils';
import axios from 'axios';
// import SearchBox from '../components/SearchBox';

function Header() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <>
      <ToastContainer position='bottom-center' limit={1} />
      <header>
        <Navbar className='header' bg='dark' variant='dark' expand='lg'>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>
                {/* <i class='fas fa-pen-nib'></i> Exotic Wood Pen */}
                <img src='/images/logo.png' alt='logo'></img>
              </Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              {/* <SearchBox /> */}

              <Nav className='me-auto  w-100  justify-content-end'>
                <LinkContainer to='/about'>
                  <Nav.Link>
                    <i className='fas fa-info'></i> About Me
                  </Nav.Link>
                </LinkContainer>

                {/* Categories on mobile */}
                <NavDropdown
                  className='nav-categories'
                  title='Categories'
                  id='basic-nav-dropdown'
                >
                  <Nav className='flex-column p-2'>
                    {categories.map((category) => (
                      <Nav.Item key={category}>
                        <LinkContainer to={`/search?category=${category}`}>
                          <Nav.Link className='text-dark'>{category}</Nav.Link>
                        </LinkContainer>
                      </Nav.Item>
                    ))}
                  </Nav>
                </NavDropdown>

                {userInfo ? (
                  <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/orderhistory'>
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className='dropdown-item'
                      to='#signout'
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className='nav-link' to='/signin'>
                    <i class='fas fa-sign-in-alt'></i> Sign In
                  </Link>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='admin-nav-dropdown'>
                    <LinkContainer to='/admin/dashboard'>
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/products'>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/orders'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/users'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/messages'>
                      <NavDropdown.Item>Messages</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
                <Link to='/cart' className='nav-link'>
                  <i className='fa fa-shopping-cart'></i> Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg='danger'>
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default Header;
