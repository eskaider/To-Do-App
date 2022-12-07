import {useState} from 'react'
import './App.css';
import {Formulario} from './assets/Formulario';
import {Tarea} from './assets/Tarea'

function App() {

  const [tarea, setTarea] = useState('')
  const [listadoTarea, setListadoTarea] = useState([])

  function handleSubmit(e) {
    e.preventDefault()

    if (tarea === '') {
      alert('HEY!! Se te Olvido Asignar una Tarea :s')
      return
    }

    const nuevaTarea = {
      id: Date.now(),
      tarea: tarea,
      completado: false
    }

    let temp = [nuevaTarea, ...listadoTarea]
    setListadoTarea(temp)

    setTarea('')
    console.log(listadoTarea)
  }

  function handleChange(e) {
    setTarea(e.target.value)
    console.log(tarea)
  }

  function onActualizarTarea(objEditarTarea) {

    const {id, tarea} = objEditarTarea

    const temp = [...listadoTarea]
    const elemento = temp.find(item => item.id === id)
    elemento.tarea = tarea
    
    setListadoTarea(temp)
  }

  function onBorrarTarea(id){
    const temp = listadoTarea.filter(item => item.id !== id)
    setListadoTarea(temp)
  }

  return (
    <>
    <div className='contenedorPrincipal'>
    <h1>To-Do List</h1>

    <div className='contenedorFormulario'>
      <Formulario 
        tarea={tarea}
        handleSubmit={handleSubmit}
        handleChange={handleChange}/>
    </div>

    <div className="contenedorTareas">
      <h2>Listado de Tareas</h2>

      <div className="contenedorInfoTareas">
        {
          listadoTarea.map (tarea => (
            <Tarea
            key={tarea.id}
            id={tarea.id}
            tarea={tarea}
            onActualizarTarea={onActualizarTarea}
            onBorrarTarea={onBorrarTarea} />
          ))
        }
      </div>
    </div>


    </div>
    </>
  );
}

export default App;
