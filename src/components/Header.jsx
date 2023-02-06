import { React, useEffect, useState } from 'react';
import { Container, Navbar, Nav, Button, Collapse } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaUser } from 'react-icons/fa';
import useHeader from '../hooks/useHeader';
import SearchBar from './SearchBar';

function Header() {
  const [inputVisible, setInputVisible] = useState(false);
  const location = useLocation();
  const { visible, searchVisible, pageTitle, getHeaderInfo } = useHeader();

  useEffect(() => {
    getHeaderInfo(location);
  }, [location, getHeaderInfo]);

  return (
    <>
      { visible
      && (
        <Navbar bg="primary" variant="dark" className="mb-2 col-md-5 mx-auto">
          <Container>
            <Navbar.Brand data-testid="page-title">
              { pageTitle }
            </Navbar.Brand>
            <Nav.Link as={ Link } to="/profile">
              <FaUser size="1.6em" color="#ffffffcc" />
            </Nav.Link>
            { searchVisible
              && (
                <Button
                  onClick={ () => { setInputVisible(!inputVisible); } }
                  variant="primary"
                  size="sm"
                  aria-controls="collapse-search"
                  aria-expanded={ inputVisible }
                >
                  <FaSearch size="1.6em" color="#ffffffcc" />
                </Button>
              )}
          </Container>
        </Navbar>
      )}
      <Collapse in={ inputVisible }>
        <Container id="collapse-search">
          { (inputVisible && searchVisible && visible) && <SearchBar /> }
        </Container>
      </Collapse>
    </>

  );
}

export default Header;
