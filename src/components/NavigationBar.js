import React, {useState, useEffect} from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './logo.png';
import {BiPlus} from 'react-icons/bi';
import './NavigationBar.css';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';





export default function NavigationBar(props) {
    const [show, setShow] = useState(false);
    const [movieGener, setMovieGener] = useState("");
    const [movieName, setMovieName] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [query, setQuery] = useState(sessionStorage.getItem("search"))

 

    const handleClose = () => setShow(false);

    const handleCreate = () =>{
        setShow(true);
    }

    const handleCreateRecord = () =>{
        console.log(movieName, movieGener, releaseDate);
        const url = 'http://localhost:5000/addNewMovie/'
        const data = {
            name:movieName,
            date:releaseDate,
            genre:movieGener
        }

        axios.post(url, data).then((response) =>{
            console.log(response);
        });
        setShow(false);
    }

    const applySearch = () =>{
        sessionStorage.setItem("search", query);
        console.log(sessionStorage.getItem("search"))
    }

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show} onHide={() => handleClose()}
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Create New Movie Recore
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Movie Name</Form.Label>
                        <Form.Control value={movieName} type="text" placeholder="Enter movie name" onChange={(e) => setMovieName(e.target.value)}/>
                        <Form.Text className="text-muted">
                        Enter the movie name that you wish to record !
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicGener">
                    <Form.Label>Gener</Form.Label>
                    <Form.Select value={movieGener} aria-label="Default select example" onChange={(e) => setMovieGener(e.target.value)}>
                        <option>Open this select menu</option>
                        <option value="sci-fi">Sci-fi</option>
                        <option value="drama">Drama</option>
                        <option value="action">Action</option>
                        <option value="comedy">Comedy</option>

                    </Form.Select>
                    <Form.Text className="text-muted">
                        Enter the gener of the movie !
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicGener">
                    <Form.Label style={{marginRight:"20px"}}>Date of release: </Form.Label>

                        <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} max={new Date().toISOString().split("T")[0]} required />
                        
                    </Form.Group>
                    <Button variant="secondary" style={{marginRight:"20px"}} onClick={() => handleClose()}>Cancel</Button>
                    <Button variant="success"  onClick={() => handleCreateRecord()}>Create</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>

            {/* <-------------- Navbar Component ----------------> */}
            
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#"><img
                        src={logo}
                        width="70"
                        height="60"
                        className="d-inline-block align-top"
                        alt="logo"
                        /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            
                            {/* <Nav.Link href="#" disabled>
                                Link
                            </Nav.Link> */}
                        </Nav>
                        <Button variant="outline-success" id="createbutton" onClick={() => handleCreate()}> <BiPlus/> Create</Button>
                        <Form className="d-flex">
                            <Form.Control
                                value={query}
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e)=>{
                                    setQuery(e.target.value)}}
                            />
                            <Button variant="outline-success" onClick={() => applySearch()}>Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

