import { useEffect, useState } from 'react'
import './App.css'
import { DataGrid } from '@mui/x-data-grid'
import { AppBar, Toolbar, Typography, Box, InputAdornment, TextField, Button, Stack} from "@mui/material"
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled, Paper } from '@mui/material';

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


;
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 400,
  }))

    const MinhasTarefas = tarefas.map((p) =>
        <Box sx={{ width: '100%' }}>
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


                        <p> <h4>{p.titulo}</h4> {p.descricao} 
                        <p>
                            Prioridade: {p.prioridade} Data: {p.dataEvento}
                            </p>


                        </p>
                    </Typography>
                </Stack>
                <Stack>
                    <Button variant="contained" startIcon={<DeleteIcon />}>Excluir</Button>
                </Stack>
            </Item>
        </Box>
    )

    // const Titulo = tarefas.map((t) => <h1>{t.titulo}</h1>)

    return (
        <>
            <ThemeProvider theme={theme}>
                <AppBar>
                    <Toolbar>
                        <Link to="/novatarefa">NOVA TAREFA</Link>
                        <Link to="/">DASBOARD</Link>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <img href="/logo-rp.png" />
                            MUI
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
                        />

                    </Toolbar>
                </AppBar>

                <h1>Tarefas</h1>

                {tarefas.length > 0 ? MinhasTarefas : <p>Carregando...</p>}
            </ThemeProvider>
        </>
    )
}

