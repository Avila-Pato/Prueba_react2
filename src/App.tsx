
import { useState } from 'react'
import './App.css'
import { Item, ItemID } from './Interface/interface'




const INITIAL_ITEM:  Item[] = [
  {
    // crypto es un objeto de windows
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Cámaras',
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Consola',
  } 
]




function App() {
  const [items, setItems] = useState(INITIAL_ITEM)

    // recuperar elementos del formulario add un evento
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // estrategia 1  no recomendable
    //  const input = event.currentTarget.elements.namedItem('item') as HTMLInputElement

    // estrategia 2 recomendada para validaciones
    const input = event.currentTarget.elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement // javascript puro
    if (!isInput || input == null) return

    // si no es un input, no hacemos nada
    const newItem = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      text: input.value,
    }
    // agregamos el nuevo elemento a la lista
    setItems([...items, newItem])
    // reseteamos en input para quitarle el texto que tenia
    input.value = ''
  }

  // CREANDO FUNCION APRA BORRAR ELEMENTOS 
  const handleDelete = (id: ItemID) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  return (
    <main>
      <aside>
        <h1>Prueba React</h1>
        <h2>Añadir y eliminar elementos de la lsita</h2>

        <form onSubmit={handleSubmit}>
          <label>
            <input
            name='item'
            required 
            type="text"
            placeholder='Ingrese Elemento'
             />
          </label>
          <button>Añadir elemento</button>
        </form>
      </aside>

      <section>
        <h2>Lista de elemento</h2>
              {

            items.length === 0 ? (
              <p>
               <strong>
                 No hay elementos
                </strong>
                </p>
              ) : (
              <ul>
            {

            items.map(item => {
              return (
                <li key={item.id}>
                  {item.text}
                  {/* Filtando elementos por id, para eliminarlos.  */}
                  <button onClick={() => {
                    {handleDelete(item.id)}
                  }}>
                    Eliminar
                  </button>
                </li>

              )})}
            </ul>
            )
          }
      </section>
    </main>
  )
}

export default App
