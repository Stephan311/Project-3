import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import '../css/navbar.css'
import MovieView from '../pages/MovieView';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  // auto=compress&cs=tinysrgb&h=350

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container className="navbar" style={{  
  backgroundImage: "url(" + "https://www.pexels.com/photo/person-walking-between-green-forest-trees-15286/" + ")",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
}} >
          {/* <Button className = 'bored'>I'm Bored</Button> */}
    
          <Navbar.Brand as={Link} to='/'>

          <h6 style= {{color:'#078080'}}> Welcome to Moviemania: The home of entertainments </h6>

            {/* Movie Mania */}

          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >

              <Nav.Link href="/" style= {{color:'yellowgreen'}}>Home</Nav.Link>
              <Nav.Link href="movies" style= {{color:'yellowgreen'}}>Movies</Nav.Link>
              {/* <Nav.Link href="tvshows"> Tv Shows </Nav.Link> */}
              <Nav.Link href="watched" style= {{color:'yellowgreen'}}>Watched</Nav.Link>
              <Nav.Link href="wishlist" style= {{color:'yellowgreen'}}>Wishlist</Nav.Link>
              {/* <NavDropdown title="Genre" id="navbarScrollingDropdown"> */}
                {/* <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Adventure</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Comedy</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Fantsy</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Sci-Fiction</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Romance</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Crime/Mystery</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Horror</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Thriller</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Western</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Animation</NavDropdown.Item> */}
                <NavDropdown.Divider />
        
              {/* </NavDropdown> */}

              {/* <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="movies">Movies</Nav.Link> */}

            
              {Auth.loggedIn() ? (
                <>
                  
              <Nav.Link href="/saved" style= {{color:'yellowgreen'}}>My Movies</Nav.Link>

                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)} style= {{color:'yellowgreen'}}>Login/Sign Up</Nav.Link>
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
