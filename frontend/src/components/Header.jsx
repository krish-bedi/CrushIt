import { Nav, Navbar, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

    return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand>CrushIt</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onclick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
              

              <LinkContainer to='/'>
              <Nav.Link>
                <FaSignInAlt /> Sign In
              </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/register'>
              <Nav.Link>
                <FaSignOutAlt /> Sign up
              </Nav.Link>
              </LinkContainer>
              </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </header>
    );
  };
export default Header;
  
