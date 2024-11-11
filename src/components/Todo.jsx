import { useState , useEffect } from "react";


const Todo = () => {
    const [task, setTask] = useState([])
    const [inputvalue, setInputvalue] = useState('')
    const [isediting, setIsediting] = useState(false)
    const [currentindex, setCurrentindex] = useState(null)

    useEffect(() => {
        const savedtask = JSON.parse(localStorage.getItem('tasks')) || [];
        setTask(savedtask)
    }, []);

    useEffect(() => {
      localStorage.setItem('tasks' , JSON.stringify(task))
    }, [task]);
    
    


    const addtask = (e) => {
        e.preventDefault();
        if (inputvalue.trim()) {

            console.log("Current Tasks:", task); 

            if (!isediting && task.includes(inputvalue)) {
                alert('Task already exists!'); 
                return;
            }

            if (isediting) {
                const update = task.map((t, i) => i === currentindex ? inputvalue : t)
                setTask(update)
                setIsediting(false)
                setCurrentindex(null)
            }
           

            else {
                setTask([...task, inputvalue])

            }
            setInputvalue('')
        }

        console.log(inputvalue)
        console.log(task)


    

    }

    const handledelete = (idx) => {
        const newtask = task.filter((_, i) => i !== idx)
        setTask(newtask)
        console.log("Tasks after deletion:", newtask);
    }

    const editask = (idx) => {
        setInputvalue(task[idx])
        setIsediting(true)
        setCurrentindex(idx)
        console.log("Editing task:", task[idx]);
    }

   
    return (
        <div className="TodoContainer">
        <div className="Todo">
            <h1>TODO APP</h1>
           <form action="" onSubmit={addtask} >
           <input
                type="text"
                value={inputvalue}
                placeholder="Add Todo..."
                onChange={(e) => setInputvalue(e.target.value)}
            />
           </form>

            <button className="btn"  onClick={addtask}>{isediting ? 'Update Task' : 'Add Task'}</button>

            <ol>
                {task.map((item, idx) => (
                    
                    <li key={idx}>   
                        {item}
                      <div className="box">
                      <button className="delete"   onClick={() => handledelete(idx)}>Delete</button>
                      <button className="edit" onClick={() => editask(idx)}>Edit</button>
                      </div>
                    </li>
                ))}
            </ol>
        </div>
    </div>
    )
}
export default Todo;