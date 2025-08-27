import { useState } from "react";
import { connect } from "react-redux";
import { Button, Checkbox, Form, FormField } from "semantic-ui-react";


import { load_tasks, new_task, update_task } from "../../store/actions/agent";


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
        console.log(userID, "user")
        console.log(taskDescription, "taskDescription")
        console.log(is_active, "is_active")
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

    const toggleComplete = (e) => {
        setShowCompleted(true)
        if (showCompleted) {
            setShowCompleted(false);
        }
    }

    return (
        <div className="mt-5 mx-5 mb-10 flex flex-col items-center justify-center bg-[#26282B] rounded-lg shadow-inner">
            <div className='flex flex-col items-center justify-center ml-4 mr-4'>
                <i className="tasks icon font-mont drop-shadow-md !text-3xl text-white  !mb-4 !mt-4" />
                <p className='font-mont text-[0.65rem] text-white'>TASKS</p>
            </div>
            <div className="p-3">
                {tasks.length > 0 ? (
                    <ul className='rounded-md pl-2 pr-2'>
                        {tasks.map(task => (
                            task.is_active ? (
                                <li className='mb-0 p-2 flex flex-row items-center text-white bg-none' key={task.id}>
                                    <div className="flex flex-row items-center">
                                        <Checkbox
                                            id={`checkbox-${task.id}`}
                                            onChange={() => handleCheck(task.id, task.user)}
                                            className="cursor-pointer me-2"
                                        />
                                        <Form>
                                            <FormField>
                                                <input
                                                    className="!bg-black !bg-opacity-30 !text-white !w-[250px] pointer-events-none"
                                                    type='text'
                                                    name='taskDescription'
                                                    autoComplete="off"
                                                    value={task.description}
                                                />
                                            </FormField>
                                        </Form>
                                    </div>
                                </li>
                            ) : null
                        ))}
                    </ul>
                ) : null
                }
            </div>
            <div className="mb-4 p-2 flex flex-row items-center relative">
                <Checkbox checked className="me-2 pointer-events-none" />
                <Form>
                    <FormField>
                        <input
                            className="!bg-black !bg-opacity-30 !text-white !w-[250px]"
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
                    <Button onClick={handleNewTask} className="!me-4 !bg-[#232425] !text-white !px-4 !py-2 rounded absolute right-0">
                        SAVE
                    </Button>
                )}
            </div>
            <div className="mb-6 flex flex-col items-center">
                {showCompleted ? (
                    <Button size="tiny" className="!mb-3 active:translate-y-0.5 !bg-[#3f5647] !text-white" onClick={toggleComplete}>
                        Completed Tasks
                    </Button>
                ) : (
                    <Button size="tiny" inverted className="!mb-3 active:translate-y-0.5" onClick={toggleComplete}>
                        Completed Tasks
                    </Button>
                )}

                {showCompleted ? (
                    <div className="">
                        {tasks.map(task => (
                            <div className="bg-[#3f5647] rounded-md p-3">
                                {!task.is_active ? (
                                    <li className='mb-0 p-2 flex flex-row items-center text-white bg-none' key={task.id}>
                                        <div className="flex flex-row items-center">
                                            <Checkbox
                                                id={`checkedbox-${task.id}`}
                                                checked
                                                onChange={() => handleUncheck(task.id, task.user)}
                                                className="cursor-pointer me-2"
                                            />
                                            <Form>
                                                <FormField>
                                                    <input
                                                        className="!bg-[#4ade80] !bg-opacity-30 !text-white !w-[250px] pointer-events-none"
                                                        type='text'
                                                        name='taskDescription'
                                                        autoComplete="off"
                                                        value={task.description}
                                                    />
                                                </FormField>
                                            </Form>
                                        </div>
                                    </li>
                                ) : null}
                            </div>
                        ))}
                    </div>
                ) : null}
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