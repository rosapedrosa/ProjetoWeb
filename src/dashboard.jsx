import { Stack, AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { Link } from 'react-router-dom';
import { BarChart, Bar, Tooltip } from 'recharts';

function contarTarefasPorPrioridade(tarefas, prioridade) {
  return tarefas.filter((tarefa) => tarefa.prioridade === prioridade).length;
}



export default function Dashboard() {
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

  const tarefasPorPrioridade = {
    Baixa: contarTarefasPorPrioridade(tarefas, 'Baixa'),
    Media: contarTarefasPorPrioridade(tarefas, 'Media'),
    Alta: contarTarefasPorPrioridade(tarefas, 'Alta')
  };

  const data = [
    { name: 'Baixa', valor: tarefasPorPrioridade.Baixa, cor: '#8884d8' },
    { name: 'Média', valor: tarefasPorPrioridade.Media },
    { name: 'Alta', valor: tarefasPorPrioridade.Alta },
  ];
  const colors = ['#ffeb3b', '#FF7B7F', '#FF5A5F', '#B23E43'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

    return (
      <ThemeProvider theme={theme}>

        <AppBar>
          <Toolbar>
            <Box sx={{ marginRight: '16px' }}>
              <Link to="/" >Inicio</Link></Box>
            <Link to="/novatarefa">Nova Tarefa</Link>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
            </Typography>
          </Toolbar>
        </AppBar>

        <Stack direction='row' spacing={5} sx={{ marginTop: '200px' }}>

          <BarChart width={600} height={300} data={data}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="valor" fill='#FF7B7F' barSize={30} />
          </BarChart>

             
            <PieChart width={400} height={500}>
            <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="valor"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
            

        </Stack>
      </ThemeProvider>
    );
  }
