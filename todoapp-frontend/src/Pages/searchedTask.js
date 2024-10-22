
import { useLocation } from 'react-router-dom';



export default function SearchedTask() {

    const location = useLocation();
    const tasks = location.state?.tasks || [];
        

    

  return (
  <div className="container-fluid">
    <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Search Results</h2>
            {/*if results show table*/}
    {Array.isArray(tasks) && tasks.length > 0 ? (
        <table className="table border shadow">
            <thead>
                <tr>
                    <th scope="col">Task Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Due Date</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}>
                        <td>{task.taskName}</td>
                        <td>{task.description}</td>
                        <td>{task.status}</td>
                        <td>{task.dueDate}</td>
                    </tr>
                ))}
            </tbody>

        </table>
    ) : (
        <div className="alert alert-danger" role="alert">
            No results found
        </div>
        )
    }
            </div>
        </div>
    </div>
)}