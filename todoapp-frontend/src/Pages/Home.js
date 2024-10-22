import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



export default function Home() {

    const [tasks, setTasks] = useState([])


    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const result = await axios.get("http://localhost:8080/tasks")
        console.log(result.data)
        setTasks(result.data) 
    }

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:8080/task/${id}`)
        loadTasks()
    }
  return (
    <div className="container-fluid">
        <div className='py-5'>
        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">TaskName</th>
      <th scope="col">Description</th>
      <th scope="col">Status</th>
      <th scope="col">DueDate</th>
    </tr>
  </thead>
  <tbody>

    {
        tasks.map((task, index) => (
            <tr>
                <th scope="row" key={index}> {index + 1}</th>
                <td>{task.taskName}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.dueDate}</td>
                
                <Link className="btn btn-primary mx-2" to={`/viewTask/${task.id}`}>View</Link>
                <Link className='btn btn-primary mx-2' to={`/editTask/${task.id}`} >Edit</Link>
                <button className='btn btn-danger' onClick={() => deleteTask(task.id)}>Delete</button>
            </tr>
        ))
    }
  </tbody>
</table>
        </div>
    </div>
  )
}