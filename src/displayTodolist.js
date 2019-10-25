import React,{useState} from 'react';
const DisplayTodolist = (props) => {
    const ENTER=13;
    const[isEdit,setIsEdit]=useState(false);
    const [index,setIndex]=useState(-1);
    const handleEvent = (e,i) =>{
        if(e.keyCode===ENTER){
            props.changeData(e.target.value,i);
            setIsEdit(false);
            setIndex(-1);
        }
    }
    const handleEdit = (i) => {
        setIndex(i);
        setIsEdit(true);
    }
    const handleOnBlur = (e,i) => {
        props.changeData(e.target.value,i);
        setIsEdit(false);
        setIndex(-1);
    }
    return(
      <div>
       {
           props.data.map((d,i) => {
               return (
                   <div className='body'>
                   <div className='list'>
                    <div className="wrapper">
                       <label className='container'>
                       <input className='checkbox' type='checkbox' checked={d.completed} onChange={() => props.sendCount(i)}/>
                       <span class="checkmark"></span>
                        </label>
                            {isEdit===false || index!==i?
                        <li style={d.completed?{textDecorationLine:'line-through',color:'#d9d9d9'}:{textDecorationLine:'none'}} className='ele' onDoubleClick={() =>handleEdit(i)} >{d.list}</li>:<input autoFocus type='text' onBlur={(e) =>handleOnBlur(e,i)}  className='editInput' onKeyDown={(e) =>handleEvent(e,i)} defaultValue={props.data[i].list}></input>}
                         <button onClick={() =>props.editData(i)} className='btn'>X</button>
                    </div>
                   </div>
                   </div>
               )
           })
       }
      </div>
    )
  }

  export default DisplayTodolist;