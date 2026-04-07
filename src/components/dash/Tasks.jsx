import { useState } from "react";
import { connect } from "react-redux";
import { Button, Checkbox, Form, FormField } from "semantic-ui-react";
import { load_tasks, new_task, update_task } from "../../store/actions/agent";
import "./dash.css";

function Tasks({ user, load_tasks, tasks, new_task, update_task }) {
  const [taskDescription, setTaskDescription] = useState('');
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleCheck = async (taskID, user) => {
    const is_active = false;
    await update_task(taskID, user, is_active)
    load_tasks(user)
  }

  const handleUncheck = async (taskID, user) => {
    const is_active = true;
    await update_task(taskID, user, is_active)
    load_tasks(user)
  }

  const handleNewTask = async () => {
    const is_active = true;
    const userID = user.id;
    await new_task(userID, taskDescription, is_active);
    setTaskDescription('');
    setShowSaveButton(false);
    load_tasks(userID);
  };

  const handleFocus = () => setShowSaveButton(true);

  const handleBlur = (e) => {
    if (e.relatedTarget && e.relatedTarget.tagName === 'BUTTON') {
      return;
    }
    setShowSaveButton(false)
  };

  const handleChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const toggleComplete = () => {
    setShowCompleted(prev => !prev);
  }

  return (
    <div className="tasks">
      <div className='tasksHeader'>
        <i className="tasks icon" />
        <p>TASKS</p>
      </div>
      <div className="tasksBody">
        {tasks.length > 0 && (
          <ul>
            {tasks.map(task => (
              task.is_active && (
                <li key={task.id}>
                  <div className="tasksField">
                    <Checkbox
                      id={`checkbox-${task.id}`}
                      onChange={() => handleCheck(task.id, task.user)}
                      className="tasksCheck"
                    />
                    <Form>
                      <FormField>
                        <input
                          className="tasksDescription"
                          type='text'
                          name='taskDescription'
                          autoComplete="off"
                          value={task.description}
                        />
                      </FormField>
                    </Form>
                  </div>
                </li>
              )))}
          </ul>
        )}
      </div>
      <div className="newTask">
        <Checkbox checked className="tasksCheck" />
        <Form>
          <FormField>
            <input
              className="tasksDescription"
              type='text'
              name='taskDescription'
              placeholder='Enter a new task...'
              autoComplete="off"
              value={taskDescription}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </FormField>
        </Form>
        {showSaveButton && (
          <Button onClick={handleNewTask} className="button" id="tasksSave">
            SAVE
          </Button>
        )}
      </div>
      <div className="completedTasks">
        <Button size="tiny" inverted={showCompleted} className="button" onClick={toggleComplete} id="completedButton">
          COMPLETED TASKS
        </Button>
        {showCompleted && (
          <div>
            {tasks.map(task => (
              <div key={task.id} className="completedTaskItem">
                {!task.is_active && (
                  <li className='completedTaskRow'>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Checkbox
                        id={`checkedbox-${task.id}`}
                        checked
                        onChange={() => handleUncheck(task.id, task.user)}
                        className="tasksCheck"
                        style={{ cursor: 'pointer', marginRight: '0.5rem' }}
                      />
                      <Form>
                        <FormField>
                          <input
                            className="tasksDescriptionDone"
                            type='text'
                            name='taskDescription'
                            autoComplete="off"
                            value={task.description}
                          />
                        </FormField>
                      </Form>
                    </div>
                  </li>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.auth.error,
  tasks: state.agent.tasks,
});

export default connect(mapStateToProps, { load_tasks, new_task, update_task })(Tasks);
