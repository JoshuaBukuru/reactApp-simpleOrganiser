import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";

import Tasks from "./components/Tasks";

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddTask from "./components/AddTask";
//Root component
function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    //executes after rendering the page, its called after DOM updates

    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks(); //Get the task
  }, []);

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch(" http://localhost:5000/tasks"); //waits for this response before executing any other functions
    const data = await res.json(); // gives us the json data
    console.log(data);
    return data;
  };
  //Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`); //waits for this response before executing any other functions
    const data = await res.json(); // gives us the json data
    console.log(data);
    return data;
  };
  //Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    }); //Assigns an id automatically

    const data = await res.json(); //data retruned is the new task add
    setTasks([...tasks, data]);

    /*
    const id = Math.floor(Math.random() * 10000) + 1 
    console.log(id)
    const newTask = {id, ...task} // creates an object with id and whatever is stored in tasks
    setTasks([...tasks, newTask]) //We add it as an array, so that it keeps appending the array
    */
  };

  //Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    }); //fetches specific data

    console.log("delete", id);
    setTasks(tasks.filter((task) => task.id !== id)); //Only shows task with id not equal to current id
  };

  //Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT", //since this is an update,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });
    const data = await res.json();

    console.log(id);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };
  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAddTask={showAddTask}
          title="React Organiser"
        />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                ></Tasks>
              ) : (
                "No tasks"
              )}
            </>
          )}
        ></Route>

        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
