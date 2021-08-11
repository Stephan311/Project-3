import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import '../css/navbar.css'
// import MovieView from '../pages/MovieView';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container className="navbar" style={{
          backgroundImage: "url(" + "https://www.pexels.com/photo/person-walking-between-green-forest-trees-15286/" + ")",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }} >

          <Navbar.Brand as={Link} to='/'>

            <h6 style={{ color: '#078080' }}> Welcome to Moviemania: The home of entertainments </h6>

          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >

              <Nav.Link href="/" style={{ color: '#078080' }}>Home</Nav.Link>
              <Nav.Link href="movies" style={{ color: '#078080' }}>Movies</Nav.Link>
              {/* <Nav.Link href="tvshows"> Tv Shows </Nav.Link> */}
              <Nav.Link href="watched" style={{ color: '#078080' }}>Watched</Nav.Link>
              <Nav.Link href="wishlist" style={{ color: '#078080' }}>Wishlist</Nav.Link>

              <NavDropdown.Divider />

              {Auth.loggedIn() ? (
                <>

                  <Nav.Link href="/saved" style={{ color: '#078080' }}>My Movies</Nav.Link>

                  <Nav.Link onClick={Auth.logout} style= {{color:'white'}}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)} style={{ color: '#078080' }}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Go</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header className="header-signup" closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item  >
                  <Nav.Link className="signup-text" eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="signup-text" eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content >
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
