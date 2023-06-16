import { useEffect, useState } from 'react'
import './App.css'



export default function Tarefas() {
    const [tarefas, setTarefas] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/tarefas')
            .then(resp => resp.json())
            .then(data => {
                setTarefas(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    
    const MinhasTarefas = tarefas.map((p) => 
    <ul key={p.id}>
    <h3>{p.titulo}</h3>
    <p>{p.descricao}</p>
    <p>Prioridade: {p.prioridade}</p>
  </ul>)
    return (
        <>  
        <h1>Tarefas</h1>
         
        {tarefas.length > 0 ? MinhasTarefas : <p>Carregando...</p>} 
        </> 
    )
}
