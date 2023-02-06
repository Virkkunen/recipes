import React, { useEffect } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { IoFastFood } from 'react-icons/io5';
import { FaGlassMartiniAlt } from 'react-icons/fa';
import useFooter from '../hooks/useFooter';
import '../styles/footer.css';

export default function Footer() {
  const { visible, setVisibility } = useFooter();
  const location = useLocation();

  useEffect(() => {
    setVisibility(location);
  }, [location, setVisibility]);

  return (
    visible && (
      <Navbar
        fixed="bottom"
        bg="success"
        variant="light"
        className="justify footer-container col-md-5 mx-auto py-3"
      >
        <Nav.Link as={ Link } to="/drinks">
          <FaGlassMartiniAlt size="1.8em" color="#ffffffcc" />
        </Nav.Link>
        <Nav.Link as={ Link } to="/meals">
          <IoFastFood size="1.8em" color="#ffffffcc" />
        </Nav.Link>
      </Navbar>
    )
  );
}
