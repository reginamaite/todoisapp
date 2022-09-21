import React from "react";

const Lista = (props) =>{
    return(
        <ul id="lista-tareas">
        {props.todoList.map((item, key) => {
            return <li className={"list-group-item " + item.prioridad} key={key}>{item.tarea}<span className="delete" onClick={()=>props.borrar(item.id)}>x</span></li>
        })}
    </ul>
)
}
export default Lista;