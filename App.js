import './App.css';
import React, { useState } from 'react';
import Form from './Components/form/form';
import Lista from './Components/lista';
import { useEffect } from 'react';

function App() {
  const [lista, setLista] = useState([{tarea:"Pasear al perro",prioridad:" prioridad media",id:1}])
  var id = lista.length
  const agregarTarea = (() => {
    let input = document.getElementById("tarea")
    let prioridad = document.getElementById("prioridad")
    id++
      console.log(JSON.stringify({
        tarea: input.value,
        prioridad: prioridad.value,
      }))
        fetch('http://localhost:3004/lista',{
          method: 'POST',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tarea: input.value,
            prioridad: prioridad.value,
          })
        })
        .then(function(response){
        return response.json();
      })
      .then((result) => {
        setLista(result)
  })
    //setLista([...lista, {tarea:input.value, prioridad:prioridad.value, id:id}])
    input.value=('')    
});

const eliminarTarea = (id) => {
  const eliminar = lista.filter(item => item.id !== id)
  setLista(eliminar)
}
const deleteAll = () =>{
  let eliminarTodo = lista.filter (item => item !==item)
  setLista (eliminarTodo)
}

useEffect(() => {
  fetch('http://localhost:3004/lista')
  .then(function(response){
    return response.json();
  })
  .then((result) => {
    setLista(result)
  })
},[])

  return (
    <React.Fragment>
      <main>
        <h1>Lista de tareas!</h1>
        <Form
        pepe={agregarTarea}></Form>
        <h3>Tareas</h3>
        <Lista todoList={lista} borrar={eliminarTarea}></Lista>
        <p className="tips">Tip: Pueden borrar tareas clickeando en ellas</p>
        <button onClick={deleteAll}>eliminar todo</button>
      </main>
    </React.Fragment>
  );
}

export default App;
