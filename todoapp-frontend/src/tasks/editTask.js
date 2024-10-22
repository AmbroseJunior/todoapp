import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';


export default function EditTask() {
    let navigate = useNavigate();

    const { id } = useParams();


    useEffect(() => {
        loadTask();
    }, []);


    const [task, setTask] = useState({
        taskName: "",
        description: "",
        status: "",
        dueDate: ""
    })
    const { taskName, description, status, dueDate } = task


    const [errorMessage, setErrorMessage] = useState(""); 


    const onInputChange = (e) => {
        const { name, value } = e.target; 
        setTask({ ...task, [name]: value }); 
    };

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

    const loadTask = async () => {
        const result = await axios.get(`http://localhost:8080/task/${id}`)
        setTask(result.data)
    }


    // Add form for adding a new user
    return <div className="container">
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>

                <h2 className='text-center m-4'>Edit Task</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                <div className='mb-3'>
                    <label htmlFor="taskName" className="form-label">
                        taskName
                    </label>
                    <input type={"text"} className="form-control" placeholder="Enter Task Name" name="taskName" value={taskName} onChange={(e) => onInputChange(e)} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="description" className="form-label">
                        description
                    </label>
                    <input type={"text"} className="form-control" placeholder="Enter Description" name="description" value={description}  onChange={(e) => onInputChange(e)}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="status" className="form-label">
                        status
                    </label>
                    <input type={"text"} className="form-control" placeholder="Enter Status" name="status" value={status} onChange={(e) => onInputChange(e)}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="dueDate" className="form-label">
                        dueDate
                    </label>
                    <input type={"date"} className="form-control" placeholder="Enter DueDate" name="dueDate" value={dueDate} onChange={(e) => onInputChange(e)}/>
                </div>
            
                <button type="submit" className="btn btn-primary">Submit Task</button>

                <Link className="btn btn-danger mx-3" to={"/"}>Cancel Task</Link>

                {errorMessage && (
                            <p className="text-danger mt-2">{errorMessage}</p>
                        )}
                </form>
            </div>
        </div>
    </div>
  }