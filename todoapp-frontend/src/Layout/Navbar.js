import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

const [task, setTasks] = useState([]);
 const [keyword, setSearchTerm] = useState('');

 const [errorMessage, setErrorMessage] = useState(""); 


 const navigate = useNavigate();
 const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
 }

 const handleFilter = async (e) => {
   e.preventDefault()
   if (e.target.value === "") {
     setErrorMessage("Please enter a keyword."); 
     return;
   }
   setErrorMessage("");
   try {
    const result = await axios.get(`http://localhost:8080/task/filter?keyword=${keyword}`)
    console.log("result: ", result.data);
    navigate(`/searchedTask`, {state: {tasks: result.data}})
   } catch (error) {
     console.error("Error fetching task: ", error)
   }
    
  }
  //const DeleteAllSearchResult = async () => {
    //await axios.delete(`http://localhost:8080/task/filter?keyword=${keyword}`)
    //navigate("/")
  //}

  return (
    <div>
      <nav className="navbar navbar-expand-lg mix navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Personal TODO APP</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link className="btn btn-outline-light" to="/addTask" type="submit">Add New Task</Link>
          <Form onSubmit={handleFilter}>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2" 
              name="keyword"
              value={keyword}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Submit</Button>
            {errorMessage && (
                            <p className="text-danger mt-2">{errorMessage}</p>
                        )}
          </Col>
          <Col xs="auto">
          </Col>
        </Row>
      </Form>
        </div>
      </nav>
    </div>
  );
}

