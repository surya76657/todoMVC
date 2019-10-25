import React,{useState} from 'react';
import DisplayTodolist from './displayTodolist';
import DisplayActiveTodolist from './displayActiveTodolist';
import DisplayCompletedTodolist from './displayCompletedTodolist';
import './App.scss';
const ENTER=13;
const FindChecked = (props) => {
  let c=0;
  for(let i=0;i<props.data.length;i++){
      if(props.data[i].completed===true){
        c++;
      }
    }
    return (
      <div>
          {props.data.length-c > 1 ?<p>{props.data.length-c} items left</p>:<p>{props.data.length-c} item left</p>}
        </div>
    );
}
function App() {
  const [todolist,setTodolist] = useState([]);
  const [display,setDisplay] = useState(0);
  const [allMarked,setAllMarked]=useState(0);
  const handleEvent = (e) =>{
    if(e.keyCode===ENTER)
      {
        if(e.target.value!=='')
        setTodolist([...todolist,{list:e.target.value,completed:false}])
        e.target.value=''
      }
  }
  const handleClick  = (d) =>{
   todolist.splice(d,1);
   setTodolist([...todolist]);
  }
  const handleCheckbox = (d) => {
    console.log(d);
      if(todolist[d].completed===true){
        todolist[d].completed=false;
        setTodolist([...todolist]);
      }
      else{
        todolist[d].completed=true;
        setTodolist([...todolist]);
      }
  }
  const handleDisplay = (d) => {
    setDisplay(d);
  }
  const handleEditData = (d,id) =>{
    todolist[id].list=d;
    setTodolist(todolist);
  }
  const handleClearCompleted = () =>{
    let data;
    data=todolist.filter( (d,i) => d.completed===false);
    setTodolist(data);
  }
  const handleAllCompleted = () => {
    let data;
    if(allMarked===0){
    data=todolist.map( (d,i) =>{
      if(d.completed===false)
        d.completed=true;
      return d;
    });
    setAllMarked(1);
  }
  else{
    data=todolist.map( (d,i) =>{
      if(d.completed===true)
        d.completed=false;
      return d;
    });
    setAllMarked(0);
  }
    setTodolist(data);
  }

  const findNoofCompletedtodo = () =>{
    let d=0;
    for(let i=0;i<todolist.length;i++){
      if(todolist[i].completed===true){
        d+=1;
      }
    }
    return d;    
  }
  
  return (
    <div className="App">
      <h1 className='title'>todos</h1>
      <div className='top'>
      <div className='header'>
        <button className='drop' onClick={() => handleAllCompleted()}>&#9660;</button>
        <input id='todo' autoComplete='off' type='text' placeholder='What needs to be done?' onKeyDown={handleEvent}></input>
      </div>
      {display===0 && <DisplayTodolist data={todolist} editData={(d) => {handleClick(d)}} sendCount={(d) => {handleCheckbox(d)}} changeData={(d,id) =>handleEditData(d,id)}/>}
      {display===1 && <DisplayActiveTodolist data={todolist} editData={(d) => {handleClick(d)}} sendCount={(d) => {handleCheckbox(d)}} changeData={(d,id) =>handleEditData(d,id)}/>}
      {display===2 && <DisplayCompletedTodolist data={todolist} editData={(d) => {handleClick(d)}} sendCount={(d) => {handleCheckbox(d)}} changeData={(d,id) =>handleEditData(d,id)}/>}
      
      {todolist.length>0 && <div className='footer'>
      <div className='btns'>
      <div className='ileft'>
      <FindChecked data={todolist}/>
      {display===0?<button  className='all-btn active' onClick={() =>handleDisplay(0)}>All</button>:<button  className='all-btn' onClick={() =>handleDisplay(0)}>All</button>}
      {display===1?<button  className='active-btn active' onClick={() =>handleDisplay(1)}>Active</button>:<button  className='active-btn' onClick={() =>handleDisplay(1)}>Active</button>}
      {display===2?<button  className='comp-btn active' onClick={() =>handleDisplay(2)}>Completed</button>:<button  className='comp-btn' onClick={() =>handleDisplay(2)}>Completed</button>}
      </div>
      {findNoofCompletedtodo()>0 && <button className='clr-comp' onClick={() => handleClearCompleted()}>Clear completed</button> }  
      </div>
  </div>} 
  </div>     
    </div>
  );
}

export default App;
