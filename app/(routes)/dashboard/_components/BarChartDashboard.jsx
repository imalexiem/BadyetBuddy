import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({budgetList}) {
  return (
    <div className='border rounded-lg p-5'>
        <h2 className='font-bold text-lg mb-3'> Budget Overview </h2>
        <ResponsiveContainer width={'80%'} height={300}>
            <BarChart width={500} height={300} data={budgetList} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='totalSpend' stackId="a" fill='#0f52ff' />
                <Bar dataKey='amount' stackId="a" fill='#5bd0f4' />

            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard
