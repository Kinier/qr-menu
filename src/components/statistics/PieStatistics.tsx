import { Paper } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function PieStatistics() {
    return (
        <Paper sx={{ p: 2, width: '100%' }}>
            <ResponsiveContainer height={300}>
                <PieChart width={400} height={300}>
                    <Pie data={data} outerRadius={80} fill="#8884d8" label name="name" nameKey={'name'} dataKey={'value'}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend iconSize={10} width={120} height={140} layout='vertical' align='right' verticalAlign="top" />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </Paper>
    );
}