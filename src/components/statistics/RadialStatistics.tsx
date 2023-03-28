import { Paper } from "@mui/material";
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from "recharts";

const data = [
    { name: '18-24', uv: 31.47, pv: 2400, fill: '#8884d8' },
    { name: '25-29', uv: 26.69, pv: 4567, fill: '#83a6ed' },
    { name: '30-34', uv: 15.69, pv: 1398, fill: '#8dd1e1' },
    { name: '35-39', uv: 8.22, pv: 9800, fill: '#82ca9d' },
    { name: '40-49', uv: 8.63, pv: 3908, fill: '#a4de6c' },
    { name: '50+', uv: 2.63, pv: 4800, fill: '#d0ed57' },
];

export default function RadialStatistics() {
    return (
        <Paper sx={{ p: 2 }}>
            <ResponsiveContainer height={300}>
                <RadialBarChart  width={300} height={300} innerRadius={10} outerRadius={150} barSize={10} data={data}>
                    <RadialBar background dataKey='uv' />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend iconSize={10} width={120} height={140} layout='vertical' align='right' verticalAlign="top" />
                </RadialBarChart>
            </ResponsiveContainer>
        </Paper>
    );
}