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

  const [showModal, setShowModal] = useState(false);
  let [selectedFolder, setSelectedFolder] = useState();

  const [file, setFile] = useState();
  const [formData, setFormData] = useState();

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
        fetchData(); // Call fetchData when user is signed in
      } else {
        // No user is signed in.
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };

  }, []);

  const userRedirect = () => { navigation("/login") }

  // Function to open file explorer and select a file
const selectFile = () => {
  return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.onchange = (event) => {
          const file = event.target.files[0];
          if (file) {
              resolve(file);
          } else {
              reject('No file selected');
          }
      };
      input.click();
  });
};

// Function to extract folder names from directory structure
const extractFolderNames = (directoryStructure) => {
  const folders = new Set();
  const lines = directoryStructure.split('\n');
  lines.forEach(line => {
      const parts = line.split('/');
      for (let i = 0; i < parts.length - 1; i++) {
          folders.add(parts.slice(0, i + 1).join('/'));
      }
  });
  return Array.from(folders);
};

const handleSelectChange = (event) => {
  setSelectedFolder(event.target.value);
};

const handleFolderSelect = () => {

  if (selectedFolder !== '/') {
    selectedFolder = `/${selectedFolder}/`;
  } else {
    selectedFolder = '/';
  }

  if (selectedFolder) {
    // Perform upload logic here
    console.log("Selected folder:", selectedFolder);
  
    // Send file via POST request
        axios.post('http://localhost:5000/ngrok-reference-upload-file', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                 uid: auth.currentUser.uid,
                'file-name' : file.name,
                'file-path' : '/' + selectedFolder + '/'
            }
        }).then((res) => { 
          console.log(res.data);
          setShowModal(false);
          alert("File uploaded successfully!");
        }).catch((err) => { console.log(err) });


    

  } else {
    alert("Please select a folder.");
  }
};

  const addNewFile = async () => {
    try {
        // Open file explorer to select a file
       const userSelectedFile = await selectFile();
       setFile(userSelectedFile);

        // Create form data
        const POSTrequestformData = new FormData();
        POSTrequestformData.append('file', file);

        setFormData(POSTrequestformData);

        setShowModal(true);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

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
        <Button onClick={addNewFile}>Add New File +</Button>

        {showModal === true ? (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: 600
          }}>
            <span style={{ float: 'right', cursor: 'pointer' }} onClick={() => setShowModal(false)}>&times;</span>
            <h6 style={{ marginBottom: 25, fontSize: 25 }}>Choose Where You Want to Store Your File</h6>
            <select style={{ width: 320 }} value={selectedFolder} onChange={handleSelectChange}>
              <option value="">Select A Folder From Your Drive:</option>
              <option value="/">/</option>
              {extractFolderNames(fullUserDirectory).map(folder => (
                <option key={folder} value={folder}>{folder}</option>
              ))}
            </select>
            <Button variant='success' style={{ marginLeft: 15 }} onClick={handleFolderSelect}>Select</Button>
          </div>
        </div>
      ) : null}


    </div>

    </div>
  ) : userRedirect()
)

}

export default Home