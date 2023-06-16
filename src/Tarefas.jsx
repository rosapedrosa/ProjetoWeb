import { useEffect, useState } from 'react'
import './App.css'



export default function Tarefas() {
    function Tarefas() {
        const [tarefas, setTarefas] = useState([])

        useEffect(() => {
            fetch('http://localhost/tarefas/')
                .then(resp => resp.json())
                .then(data => {
                    setTarefas(data)
                })
                .catch(err => {
                    console.log(err)
                })
        }, [])
    }
    // const MinhasTarefas = tarefas.map((p) => <h5 key={p.id}> {p.titulo}</h5> )
    return (
        <>  Tarefas
            {/* {MinhasTarefas} */}
        </> 
    )
}
