import { useEffect, useState } from 'react'
import './App.css'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { AppBar, Toolbar} from "@mui/material"
import { Link } from 'react-router-dom';



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

    const columns = [
        {
            field: 'titulo',
            headerName: 'Título',
            type: 'object',
            width: 150,
            editable: true,
        },
        {
            field: 'descricao',
            headerName: 'Descrição',
            width: 150,
            editable: true,
        },
        {
            field: 'dataEvento',
            headerName: 'Data',
            width: 150,
            editable: true,
        },
        {
            field: 'prioridade',
            headerName: 'Prioridade',
            width: 150,
            editable: false,
        },
        {
            field: 'botao',
            headerName: '  ',
            width: 150,
            editable: false,
        }
    ];
    const rows = [
        {id: 1, titulo: 't', descricao: 'Jon', dataEvento: 35, prioridade: 'Baixa' },
        ];


    const MinhasTarefas = tarefas.map((p) =>
        <>            <ul key={p.id}>
                <h3>{p.titulo}</h3>
                <p>{p.descricao}</p>
                <p>Prioridade: {p.prioridade}</p>
                <p>Data: {p.dataEvento}</p>
            </ul></>
    )

    // const Titulo = tarefas.map((t) => <h1>{t.titulo}</h1>)

    return (
        <>
            <AppBar>
                <Toolbar>

                    <Link to="/">
                        Inicio
                    </Link>
                    <Link to="/novatarefa">
                        Nova Tarefa
                    </Link>
                    <Link to="/">
                        Dasboard
                    </Link>

                </Toolbar>
            </AppBar>

            <h1>Tarefas</h1>

            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
            {tarefas.length > 0 ? MinhasTarefas : <p>Carregando...</p>}
        </>
    )
}

