import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';


export default function ViewTask() {

    const [task, setTask] = useState({
        taskName: "",
        description: "",
        status: "",
        dueDate: ""
    })
    
    const { id } = useParams();

    useEffect(() => {
        loadTask();
    }, []);

    const loadTask = async () => {
        const result = await axios.get(`http://localhost:8080/task/${id}`);
        setTask(result.data);
    }


  return <div className="container">
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>

          <h2 className='text-center m-4'>View Task: {task.id}</h2>
            <div className='card'>
                <div className='card-header'>
                    View Task Details   
                </div>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>
                        <b>TaskName: </b>
                        {task.taskName}
                    </li>
                    <li className='list-group-item'>
                        <b>Description: </b>
                        {task.description}
                    </li>
                    <li className='list-group-item'>
                        <b>Status: </b>
                        {task.status}
                    </li>
                    <li className='list-group-item'>
                        <b>DueDate: </b>
                        {task.dueDate}
                    </li>
                </ul>
            </div>
        </div>
        <Link className="btn btn-primary" to="/">Back to Home</Link>
    </div>
</div>
}
