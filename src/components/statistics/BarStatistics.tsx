import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts";



export default function BarStatistics() {
    const [templateOrdersStatistics, setTemplateOrdersStatistics] = useState<any>([
        { name: 'Mon', orders: 0, revenue: 0 },
        { name: 'Tue', orders: 0, revenue: 0 },
        { name: 'Wed', orders: 0, revenue: 0 },
        { name: 'Thu', orders: 0, revenue: 0 },
        { name: 'Fri', orders: 0, revenue: 0 },
        { name: 'Sat', orders: 0, revenue: 0 },
        { name: 'Sun', orders: 0, revenue: 0 },
      ]);
    
      useEffect(() => {
        const _ = async () => {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/order/statistics/week/ordersPrice`);
          const days = await response.json();
          setTemplateOrdersStatistics(days)
          // console.log(data);
    
        }
        _()
      }, [])
    return (
        <Paper sx={{ p: 2 }}>
            <ResponsiveContainer height={300}>
                <BarChart width={500} height={300} data={templateOrdersStatistics}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" />
                    {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    )
}