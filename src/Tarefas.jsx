import { useEffect, useState } from 'react'
import './App.css'
import { DataGrid } from '@mui/x-data-grid'
import { AppBar, Toolbar, Typography, Box, InputAdornment, TextField, Button, Stack } from "@mui/material"
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';

export default function Tarefas() {
    const [tarefas, setTarefas] = useState([])
    const [pesquisa, setPesquisa] = useState('')
    const [tarefasFiltradas, setTarefasFiltradas] = useState([])
    const [tarefaEditada, setTarefaEditada] = useState(null);
    const navigate = useNavigate()
    const { id } = useParams()

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


    function handleExcluirTarefa(id) {
        fetch('http://localhost:3000/tarefas/' + id, {
            method: 'DELETE'
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(id)
                setTarefas(tarefas.filter(tarefa => tarefa.id !== id))
                navigate('/')
            })
            .catch(err => {
                console.log(err)
            })
    };

    function handleEdit(id) {
        const tarefaSelecionada = tarefas.find(tarefa => tarefa.id === id);
        setTarefaEditada(tarefaSelecionada);
        navigate('/novatarefa/' + id);
    }


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        maxWidth: 400,
    }))

    useEffect(() => {
        const tarefasFiltradas = tarefas.filter(tarefa => tarefa.titulo.includes(pesquisa))
        setTarefasFiltradas(tarefasFiltradas)
    }, [tarefas, pesquisa])

    const MinhasTarefas = tarefas.map((p) =>
        <Box sx={{ width: '100%' }} key={p.id}>
            <Item
                sx={{
                    my: 1,
                    mx: 'auto',
                    p: 4,
                }}
            >
                <Stack direction="row"
                    justifyContent="space-evenly"
                    alignItems="flex-start"
                    spacing={2}
                >

                    <Typography>
                        <span style={{ fontSize: '25px' }}>{p.titulo}</span>
                        <br />
                        <span>{p.descricao}</span>
                        <br />
                        <span>Prioridade: {p.prioridade}</span>
                        <br />
                        <span>Data: {p.dataEvento}</span>

                    </Typography>
                </Stack>
                <Stack spacing={1}>
                    <Button onClick={() => handleExcluirTarefa(p.id)} variant="contained" startIcon={<DeleteIcon />}>Excluir</Button>
                    <Button onClick={() => handleEdit(p.id)} color="secondary" variant="contained" startIcon={<EditIcon />}>Editar</Button>
                </Stack>
            </Item>
        </Box>
    )


    return (
        <>
            <ThemeProvider theme={theme}>
                <AppBar>
                    <Toolbar>
                        <Box sx={{ marginRight: '16px' }}>
                            <Link to="/" >Inicio</Link> </Box>
                        <Box sx={{ marginRight: '16px' }}>
                            <Link to="/novatarefa" sx={{ marginRight: '50px' }}>Nova Tarefa</Link></Box>
                        <Link to="/dashboard">Dashboard</Link>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        </Typography>
                        <TextField
                            placeholder="Pesquisar..."
                            variant="outlined"
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}

                            onChange={(e) => setPesquisa(e.target.value)} />

                    </Toolbar>
                </AppBar>
                <img src="/public/logo.png" alt="Logo" />
                {tarefasFiltradas.length > 0 ? (
                    tarefasFiltradas.map((p) => (
                        <Box sx={{ width: '100%' }} key={p.id}>
                            <Item
                                sx={{
                                    my: 1,
                                    mx: 'auto',
                                    p: 4,
                                }}
                            >
                                <Stack direction="row" justifyContent="space-evenly" alignItems="flex-start" spacing={2}>
                                    <Typography>
                                        <span style={{ fontSize: '25px' }}>{p.titulo}</span>
                                        <br />
                                        <span>{p.descricao}</span>
                                        <br />
                                        <span>Prioridade: {p.prioridade}</span>
                                        <br />
                                        <span>Data: {p.dataEvento}</span>
                                    </Typography>
                                </Stack>
                                <Stack spacing={1}>
                                    <Button onClick={() => handleExcluirTarefa(p.id)} variant="contained" startIcon={<DeleteIcon />}>
                                        Excluir
                                    </Button>
                                    <Button onClick={() => handleEdit(p.id)} color="secondary" variant="contained" startIcon={<EditIcon />}>
                                        Editar
                                    </Button>
                                </Stack>
                            </Item>
                        </Box>
                    ))
                ) : tarefas.length > 0 ? (
                    MinhasTarefas
                ) : (
                    <p>Carregando...</p>
                )}
            </ThemeProvider>
        </>
    )
}

