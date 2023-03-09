import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import './MovieList.css'
import Button from 'react-bootstrap/Button';
import {BiEditAlt} from 'react-icons/bi';
import {BsFillFilterSquareFill} from 'react-icons/bs';
import {RiDeleteBin5Line} from 'react-icons/ri';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


export default function MovieList(props) {

    const [movieList, setMovieList] = useState([]);
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [movieItem, setMovieItem] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    const [movieGener, setMovieGener] = useState("");
    const [filterGener, setFilterGener] = useState("all");

    const [movieName, setMovieName] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [editId, setEditId] = useState("");

    useEffect(() =>  {
        const url = "http://localhost:5000/getAllMovie"
        axios.get(url).then((response) =>{
            if(filterGener === "all"){
                setMovieList(response.data.tasks);
            }
            else{
                setMovieList(response.data.tasks.filter(c => c.genre === filterGener));

            }
        });
    });

    const handleClose = () => setShow(false);
    
    

    const handleShowDelete =(id)=> {
        console.log("movie id",id);
        setMovieItem(id);
        setShow(true);
        
    }
    
    const confirmDeletion = () =>{
        setDeleteConfirm(true)
        if(deleteConfirm){
            const url = "http://localhost:5000/deleteMovie/"+movieItem
            axios.delete(url).then((response) =>{
                        console.log(response.data);
                    });
                    setMovieItem("")
                    handleClose();
        }
        else{
            setMovieItem("");
            handleClose();
        }
    }

    const handleEdit = (id)=>{
        
        console.log(id);
        // console.log(movieList)
        const data = movieList.filter(c => c._id === id);
        console.log(data[0].genre)
        setMovieName(data[0].name)
        setReleaseDate(data[0].date)
        setMovieGener(data[0].genre)
        setShowEdit(true);
        setEditId(id)
        console.log(movieGener)


    }

    const handleEditRecord = () =>{
        console.log(movieName, movieGener, releaseDate);
        const url = 'http://localhost:5000/editMovie/'+editId
        const data = {
            name:movieName,
            date:releaseDate,
            genre:movieGener
        }

        axios.patch(url, data).then((response) =>{
            console.log(response);
        });
        setEditId("");
        setShowEdit(false);
    }

    // const applyFilter = () => {
    //     console.log(filterGener)
    // }

  return (
    <div>
        <Container style={{marginTop: "20px"}}>
        <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showEdit} onHide={() => setShowEdit(false)}
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Edit Movie Record
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
                        <option >Open this select menu</option>
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
                    <Form.Label>Date: </Form.Label>

                        <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} max={new Date().toISOString().split("T")[0]} required />

                    </Form.Group>
                    <Button variant="secondary" style={{marginRight:"20px"}} onClick={() => setShowEdit(false)}>Cancel</Button>
                    <Button variant="success"  onClick={() => handleEditRecord()}>Edit</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>
            <Modal show={show} onHide={() => handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete record ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => confirmDeletion()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row >
                <div style={{display:"flex", alignItems:"row", textAlign:"center", margin:"20px 40px 20px 0px", justifyContent:"end"}}>
                <h6 style={{padding:"10px"}}>Gener: </h6>
                    <Form.Select style={{width:"300px", height:"40px"}} value={filterGener} aria-label="Default select example" onChange={(e) => setFilterGener(e.target.value)}>
                        <option value="all">All</option>
                        <option value="sci-fi">Sci-fi</option>
                        <option value="drama">Drama</option>
                        <option value="action">Action</option>
                        <option value="comedy">Comedy</option>

                    </Form.Select>
                    {/* <Button variant="secondary" style={{height:"40px", marginLeft:"20px"}} onClick={() => applyFilter()}>
                        <BsFillFilterSquareFill className='oppIcons'/>Filter
                    </Button> */}
                </div>
            </Row>
                <Row style={{width:"100%", paddingLeft:"10px"}}>
                    <Col lg={1} >
                        <h6>Sno.</h6>
                    </Col>
                    <Col lg={4} className="info">
                        <h6>Movie Name</h6>
                    </Col >
                    <Col lg={2} className="info">
                        <h6>Date Of Relese</h6>
                    </Col>
                    <Col lg={2} className="info">
                        <h6>Gener</h6>
                    </Col>
                    <Col className="info">
                    <h6>Opetarions</h6>
                    
                    </Col>
                </Row>

                {movieList.filter(item=>item.name.toLowerCase().includes(sessionStorage.getItem("search"))).length >0?
            <div>
            {movieList.filter(item=>item.name.toLowerCase().includes(sessionStorage.getItem("search"))).map((movie, index) =>
            
            <div id="list">
                <Row style={{width:"100%", paddingLeft: "10px"}}>
                    <Col lg={1} className="info">
                        <p>{index+1}</p>
                    </Col>
                    <Col lg={4} className="info">
                        <p>{movie.name}</p>
                    </Col >
                    <Col lg={2} className="info">
                        <p>{movie.date}</p>
                    </Col>
                    <Col lg={2} className="info">
                        <p>{movie.genre}</p>
                    </Col>
                    <Col className="info">
                    <Button variant="outline-primary" className='operationButton' onClick={() => handleEdit(movie._id)}><BiEditAlt className='oppIcons'/> Edit</Button>
        
                    <Button variant="outline-danger" onClick={() => handleShowDelete(movie._id)} className='operationButton'><RiDeleteBin5Line className='oppIcons'/>Delete</Button>
                    </Col>
                </Row>
            </div>
            
            )}</div>:
            <div style={{display:"flex",justifyContent:"center"}}>
            <h1>no records found</h1>
            
            </div>
                }
        </Container>
    </div>
  )
}
