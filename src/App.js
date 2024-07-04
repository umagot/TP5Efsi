import React, { useState } from 'react';
import './App.css';
function App() {
  const [tarea, setTarea] = useState('');
  const [todos, setTodos] = useState([]);

  const agregarTODO = () => {
    if (!tarea.length) {
      alert("Ingrese la tarea a realizar");
      return;
    }

    const nuevaTarea = {
      tarea: tarea,
      timestamp: new Date().toLocaleString(),
      completado: false,
      timestampTachado: null
    };

    setTodos([...todos, nuevaTarea]);
    setTarea('');
  };

  const eliminarTODO = (index) => {
    const nuevosTodos = todos.filter((_, i) => i !== index);
    setTodos(nuevosTodos);
  };

  const Completo = (index) => {
    const nuevosTodos = todos.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          completado: !todo.completado,
          timestampTachado: !todo.completado ? new Date().toLocaleString() : null
        };
      }
      return todo;
    });
    setTodos(nuevosTodos);
  };

  const tareamasrapida = () => {
    if (todos.length === 0) {
      alert("No hay tareas ingresadas");
      return;
    }

    const tareasCompletadas = todos.filter(todo => todo.completado);

    if (tareasCompletadas.length === 0) {
      alert("No hay tareas completadas");
      return;
    }

    let tareaMasRapida = tareasCompletadas[0];
    tareasCompletadas.forEach(todo => {
      if (new Date(todo.timestamp) < new Date(tareaMasRapida.timestampTachado)) {
        tareaMasRapida = todo;
      }
    });

    alert(`La tarea más rápida fue: ${tareaMasRapida.tarea}`);
  };

  return (
    <div>
      <h1>TO DO LIST</h1>
      <input
        type="text"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
        required
      />
      <button onClick={agregarTODO}>AgregarTODO</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} onClick={() => Completo(index)} style={{ textDecoration: todo.completado ? 'line-through' : 'none' }}>
            {todo.tarea}
            <button onClick={() => eliminarTODO(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <button onClick={tareamasrapida}>Tarea más rápida</button>
    </div>
  );
}

export default App;
