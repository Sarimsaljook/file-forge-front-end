import React, { useState, useEffect } from 'react';

import auth from '../firebase';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';

const Home = () => {

  const [user, setUser] = useState(null);
  const navigation = useNavigate();

  const [fullUserDirectory, setFullUserDirectory] = useState('');

  const expand = false;

  useEffect(() => {

    const fetchData = () => {
      if(auth.currentUser){
      axios.get("http://localhost:5000/ngrok-reference-user-directory", {
        headers: {
          'uid': auth.currentUser.uid,
        }
    }).then((res) => {
      setFullUserDirectory(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }
    };

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in.
        setUser(authUser);
      } else {
        // No user is signed in.
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
      fetchData();
    };

  }, []);

  const userRedirect = () => { navigation("/login") }

  return ( user ? 
    (

      <div>
<Navbar key={expand} expand={expand} bg='dark' data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand href="/">
            <img
              alt="Logo"
              src={require("../assets/file_forge_app_logo.png")}
              width="70"
              height="70"
              className="d-inline-block align-top"
              style={{ marginLeft: 10, marginTop: 10, marginBottom: 10 }}
            /> 
            {' '}
            <label style={{ marginLeft: 20, marginTop: 22, fontSize: 25}}>FileForge</label>
              </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  FileForge Home
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <NavDropdown
                    title="Settings"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">My Account</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item href="#action3">Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>

    <div style={{ margin: 'auto', textAlign: 'center', marginTop: 70, fontSize: 30 }}>
        <h1>Manage Your Files Here!</h1>
    </div>

    <div style={{ margin: 'auto', textAlign: 'left', marginTop: 70, width: 670 }}>
    {fullUserDirectory ? <h6>{fullUserDirectory}</h6> : <h3>Loading Your FileForge Drive...</h3>}
    </div>

    <div style={{ margin: 'auto', textAlign: 'center', marginTop: 70, fontSize: 20 }}>
        <Button>Add New File +</Button>
    </div>

    </div>
  ) : userRedirect()
)

}

export default Home