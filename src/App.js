import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const	[tasks, setTasks] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/tasks')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  if (!tasks) return;

  const createTask = () => {
    fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        description: description,
		isInProgress: false,
		completed: false
      })
    })
    .catch((error) => {
      console.log(error)
    })
	window.location.reload();
  }

	const updateProgress = () => {
		fetch('http://localhost:3001/tasks/' + selectedTask.id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: selectedTask.title,
				description: selectedTask.description,
				isInProgress: true,
				completed: false
			})
		})
		.catch((error) => {
			console.log(error)
		})
		window.location.reload();
	}

	const updateDone = () => {
		fetch('http://localhost:3001/tasks/' + selectedTask.id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: selectedTask.title,
				description: selectedTask.description,
				isInProgress: false,
				completed: true
			})
		})
		.catch((error) => {
			console.log(error)
		})
		window.location.reload();
	}

	const isSelected = (task) => {
		if (task === selectedTask) {
			return true;
		}else {
			return false;
		}
	}

  return (
    <div>
      <header className='navbar'>
        <a className='nav-text'>Simple Task board</a>
      </header>

      <main className="task-board">
        <div className='task-form'>
          <form className="form-header">
            <input
            	className='form-title'
				type="text"
              	placeholder="Task title" 
              	onChange={(e) => setTitle(e.target.value)}	
            />
            <input 
            	className="form-description"
              	type="text"
              	placeholder="Description" 
              	onChange={(e) => setDescription(e.target.value)}
            />
            <button className="task-create" type='button' onClick={createTask}>Create</button>
          </form>
        </div>

		<div className='task-to-inprogress' onClick={() => updateProgress()}>
			>
		</div>

        <div className='task-todo'>
          Todo
          <div className='task'>
			{tasks.filter((task) => task.isInProgress === false && task.completed === false).map((task) => {
				return (
					// task-box
					<div key={task.id} className={isSelected(task) ? 'task-box-h' : 'task-box'} onClick={() => setSelectedTask(task)}>
						<div className='task-title'>{task.title}</div>
						<div className='task-description'>{task.description}</div>
					</div>
				)}
			)}
          </div>
        </div>
        <div className='task-inprogress'>
          In progress
        	<div className='task'>
				{tasks.filter((task) => task.isInProgress === true && task.completed === false).map((task) => {
					return (
						<div key={task.id} className={isSelected(task) ? 'task-box-h' : 'task-box'} onClick={() => setSelectedTask(task)}>
							<div className='task-title'>{task.title}</div>
							<div className='task-description'>{task.description}</div>
						</div>
					)}
				)}
        	</div>
        </div>
				
		<div className='task-to-done' type="button" onClick={() => updateDone()}>
			>
		</div>

        <div className='task-done'>
          Done
          	<div className='task'>
				{tasks.filter((task) => task.isInProgress === false && task.completed === true).map((task) => {
					return (
						<div key={task.id} className='task-box-g' onClick={() => setSelectedTask(task)}>
							<div className='task-title'>{task.title}</div>
							<div className='task-description'>{task.description}</div>
						</div>
					)}
				)}
          	</div>
        </div>
      </main>
    </div>
  );
}

export default App;
