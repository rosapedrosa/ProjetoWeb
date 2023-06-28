import { useEffect, useState } from 'react';
import './App.css';
import './Tarefas.jsx'
import { Stack, TextField, MenuItem, AppBar, Toolbar, Typography, Box, InputAdornment } from '@mui/material';
import { Button } from '@mui/material';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { useNavigate, useParams } from 'react-router-dom'




function App() {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState('')
  const [dataEvento, setDataEvento] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  function handleSubmit(e) {
    e.preventDefault()

    if (id) {
      fetch('http://localhost:3000/tarefas/' + id, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descricao, prioridade, dataEvento })
      }).then(() => {
        console.log("Registro alterado!")
        navigate('/')
      }).catch((erro) => {
        console.error(erro)
      })

    } else {
      fetch('http://localhost:3000/tarefas/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descricao, prioridade, dataEvento })
      }).then(() => {
        console.log("Nova tarefa adicionada")
        navigate('/')
      }).catch((erro) => {
        console.error(erro)
      })
    }
  }


  useEffect(() => {
    fetch('http://localhost:3000/tarefas/' + id)
      .then((resp) => resp.json())
      .then((dados) => {
        console.log(dados)
        setTitulo(dados.titulo)
        setDescricao(dados.descricao)
        setPrioridade(dados.prioridade)
        setDataEvento(dados.dataEvento)
      }).catch((erro) => {
        console.error(erro)
      })
  }, [id])
 


  function ajeitaData(data) {
    const mes = parseInt(data.$M) + 1
    const novaData = data.$D + "/" + mes + "/" + data.$y
    //console.log(novaData)
    setDataEvento(novaData)
  }


  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar>
          <Toolbar>
            <Box sx={{ marginRight: '16px' }}>
              <Link to="/" >HOME</Link></Box>
            <Link to="/dashboard">DASHBOARD</Link>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >


            </Typography>


          </Toolbar>
        </AppBar>

        <img src="/public/logo.png" alt="Logo" />
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ minWidth: 500 }}>
            <TextField placeholder='Digite o título da sua tafera' id="titulo" label="Título" variant="outlined" fullWidth onChange={(e) => setTitulo(e.target.value)} />
            <TextField placeholder='Digite uma descrição' id="descricao" label="Descrição" variant="outlined" fullWidth multiline
              rows={4} onChange={(e) => setDescricao(e.target.value)} />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker id="dataEvento" onChange={(newValue) => ajeitaData(newValue)} />
            </LocalizationProvider>

            <Select id="prioridade" label="Prioridade" onChange={(e) => setPrioridade(e.target.value)}>
              <MenuItem value="">
                <em>Selecione</em>
              </MenuItem>
              <MenuItem value='Baixa'>Baixa</MenuItem>
              <MenuItem value='Media'>Media</MenuItem>
              <MenuItem value='Alta'>Alta</MenuItem>
            </Select >

            <Button type="submit" variant="contained">Enviar</Button>


          </Stack>
        </form>
      </ThemeProvider>
    </>
  )

    ;

}

export default App
