import { useState } from 'react';
import './App.css';
import { Stack, TextField, MenuItem, InputLabel } from '@mui/material';
import { Button } from '@mui/base';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function App() {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState('')
  const [dataEvento, setDataEvento] = useState('')


  function handleSubmit(e) {
    e.preventDefault()
    console.log(JSON.stringify({ titulo, descricao, prioridade, dataEvento }))
    fetch('http://localhost:3000/tarefas/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, descricao, prioridade})
    }).then(() => {
      console.log("Nova tarefa adicionada")
    }).catch((erro) => {
      console.log(erro)
    })

}


  return (
    <>

      <h1>Nova Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ minWidth: 500 }}>
          <TextField placeholder='Digite o título da sua tafera' id="titulo" label="Título" variant="outlined" fullWidth onChange={(e) => setTitulo(e.target.value)} />
          <TextField placeholder='Digite uma descrição' id="descricao" label="Descrição" variant="outlined" fullWidth multiline
            rows={4} onChange={(e) => setDescricao(e.target.value)} />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker id="dataEvento" />
          </LocalizationProvider>

          <Select id="prioridade" label="Prioridade" onChange={(e) => setPrioridade(e.target.value)}>
            <MenuItem value="">
              <em>Selecione</em>
            </MenuItem>
            <MenuItem value="baixa">Baixa</MenuItem>
            <MenuItem value="media">Media</MenuItem>
            <MenuItem value="alta">Alta</MenuItem>
          </Select >
          <Button type="submit" variant="contained">Enviar</Button>


        </Stack>
      </form>
    </>
  )
}

export default App
