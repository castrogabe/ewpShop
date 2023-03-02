import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  Badge,
  Button,
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { getError } from '../utils';
import axios from 'axios';
import SearchBox from '../components/SearchBox';

function Header() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
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
        <div
          className={
            sidebarIsOpen
              ? 'd-flex flex-column site-container active-cont'
              : 'd-flex flex-column site-container'
          }
        >
          <Navbar bg='dark' variant='dark' expand='lg'>
            <Button
              variant='dark'
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <i className='fas fa-bars'></i>
            </Button>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>Exotic Wood Pen</Navbar.Brand>
              </LinkContainer>

              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                {/* SearchBox Optional */}
                <SearchBox />

                <Nav className='me-auto  w-100  justify-content-end'>
                  <LinkContainer to='/about'>
                    <Nav.Link>About Me</Nav.Link>
                  </LinkContainer>

                  {/* Categories on mobile */}
                  <NavDropdown
                    className='nav-categories'
                    title='Categories'
                    id='basic-nav-dropdown'
                  >
                    <Nav className='flex-column text-dark w-100 p-2'>
                      {categories.map((category) => (
                        <Nav.Item key={category}>
                          <LinkContainer to={`/search?category=${category}`}>
                            <Nav.Link className='text-dark'>
                              {category}
                            </Nav.Link>
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
                      Sign In
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
                    </NavDropdown>
                  )}
                  <Link to='/cart' className='nav-link'>
                    Cart
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

          {/* sideBar Categories option */}
          <div
            className={
              sidebarIsOpen
                ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
                : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
            }
          >
            <Nav className='flex-column text-white w-100 p-2'>
              <Nav.Item>
                <strong>Categories</strong>
              </Nav.Item>
              {categories.map((category) => (
                <Nav.Item key={category}>
                  <LinkContainer
                    to={`/search?category=${category}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    <Nav.Link>{category}</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              ))}
            </Nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
