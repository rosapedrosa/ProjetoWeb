import { Stack } from "@mui/material";
import { useEffect, useState } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [tarefas, setTarefas] = useState([])


  const tarefasPie = [
    { titulo: "Segunda",
      descricao: "mmm",
      prioridade: "Alta",
      dataEvento: "16/6/2023",
      id: 7
    }
  ];

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

  return (
    <Stack direction='column' spacing={2}>
      <LineChart width={600} height={400} data={tarefas}>
        <Line
          dot={{ stroke: 'blue', strokeWidth: 6 }}
          type='monotone'
          dataKey='id'
          stroke='#8884d8'
        />
        <CartesianGrid stroke='#aaa' />
        <XAxis dataKey='nome' />
        <YAxis />
      </LineChart>

      <PieChart width={400} height={400}>
        <Pie
          dataKey='id'
          startAngle={180}
          endAngle={0}
          data={tarefasPie}
          cx='50%'
          cy='50%'
          outerRadius={80}
          fill='#8884d8'
          label
        />
      </PieChart>

      <PieChart width={400} height={400}>
        <Pie
          data={tarefasPie}
          dataKey='id'
          cx='50%'
          cy='50%'
          innerRadius={70}
          // outerRadius={90}
          fill='#82ca9d'
          label
        />
      </PieChart>

      <PieChart width={400} height={400}>
        <Pie data={tarefas} dataKey="id" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
        <Pie data={tarefas} dataKey="id" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
      </PieChart>
    </Stack>
  );
}
