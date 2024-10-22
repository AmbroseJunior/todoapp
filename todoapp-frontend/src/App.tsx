
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Layout/Navbar';
import Home from './Pages/Home';
import SearchedTask from './Pages/searchedTask';
import AddTask from './tasks/addTask';
import EditTask from './tasks/editTask';
import ViewTask from './tasks/viewTask';




function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path= "/editTask/:id" element={<EditTask/>} />
        <Route path="/viewTask/:id" element={<ViewTask/>} />
        <Route path="/searchedTask" element={<SearchedTask/>} />
      </Routes>
      </Router>
    </div>
  )
}

export default App;
