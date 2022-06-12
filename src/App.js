import { useState,useRef, useEffect } from 'react'
import TaskList from './components/TaskList'
import './index.css'
import Button from './components/Button'

const LOCAL_STORAGE_KEY = 'todoApp.todos'
const App = () => {
  const tasksRef = useRef()
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTasks) setTasks(storedTasks)
  }, [])
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])
  useEffect(() => {
    console.log('something changed')
  }, [tasks])
  function addTasks(){
    var taskName = tasksRef.current.value
    var id = Math.floor(Math.random()*10000)+1
    if (taskName === '') return alert('Please Add a Task')
    setTasks(prevTodos => {
      return [...tasks, {id:id, name:taskName, complete:false}]
    })
    tasksRef.current.value = null
  }
  function toggleTask(id){
    const newTasks = [...tasks]
    const task = newTasks.find(task => task.id === id)
    task.complete = !task.complete
    setTasks(newTasks)
  }
  function removeTasks(){
  const newTasks = tasks.filter(task => !task.complete)
  setTasks(newTasks)
  }
  function removeAllTasks(){
  setTasks([]) 
  }
  function clearStorage(){
    localStorage.clear()
    alert('Storage has been cleared, refresh page to see results')
  }
  function onToggle(){
    alert('toggled')
  }
  // npm uninstall -g create-react-app && npm i -g npm@latest && npm cache clean -f   COMMAND
  return (
    <div className='container'>
 <h1 className='project-title'>React JS Task Tracker</h1>
{
  tasks.length == 0 ? '': <h1 className='total-tasks'>{tasks.filter(task => !task.complete).length} left to do </h1>
}
      <input className = 'input-field' ref ={tasksRef} placeholder = 'Add Task...'/>
      <Button bgColor="#35CF79" textColor="white" onClick = {addTasks} text='Add Task' bottom ="79px" right = '95px'/>
      <Button bgColor = '#1183F5' textColor='white' onClick ={removeTasks} bottom = '109px' right='-95px' text='Remove Task'/>
      <Button bgColor = '#F7440B' textColor='white' onClick = {removeAllTasks} text='Delete All Tasks' bottom = '79px' right = '95px'/>
      <Button bgColor = '#F7CA0B' textColor='black' onClick = {clearStorage} text='Clear Storage' bottom = '108px' right='-95px'/>
      { tasks.length > 0 ? <TaskList tasks = {tasks} toggleTask = {toggleTask}/> : 'No tasks to show'}

    </div>
  
  )
}
{/* https://www.youtube.com/watch?v=THL1OPn72vo&list=PLZlA0Gpn_vH_NT5zPVp18nGe_W9LqBDQK&index=11 */}
    {/* https://github.com/john-smilga/javascript-basic-projects */}
export default App
