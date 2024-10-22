import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddTask() {

    let navigate = useNavigate();

    const [task, setTask,] = useState({
        taskName: "",
        description: "",
        status: "",
        dueDate: ""
    });

    const { taskName , description, status, dueDate } = task; 

    
    const [errorMessage, setErrorMessage] = useState(""); 

    const onInputChange = (e) => {
        const { name, value } = e.target; 
        setTask({ ...task, [name]: value }); 
    };

    // Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!taskName || !description || !status || !dueDate) {
            setErrorMessage("Please fill in all the fields."); 
            return;
        }

        setErrorMessage(""); 

        await axios.post("http://localhost:8080/task", task);
        navigate("/");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register New Task</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="taskName" className="form-label">
                                taskName
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Task Name"
                                name="taskName" 
                                value={taskName}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                description
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Description"
                                name="description" 
                                value={description}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">
                                Status
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Status"
                                name="status" 
                                value={status}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dueDate" className="form-label">
                                dueDate
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                name="dueDate"
                                value={dueDate}
                                onChange={onInputChange}
                            />
                        </div>
                        
                    
                        <button type="submit" className="btn btn-primary">Submit Task</button>

                        <Link className="btn btn-danger mx-3" to="/">Cancel Task</Link>

                        {errorMessage && (
                            <p className="text-danger mt-2">{errorMessage}</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
