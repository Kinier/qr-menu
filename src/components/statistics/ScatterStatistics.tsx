import { Paper } from "@mui/material";
import { ScatterChart, XAxis, YAxis, CartesianGrid, Tooltip, Scatter, ResponsiveContainer } from "recharts";

const data = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
];

export default function ScatterStatistics() {
    return (
        <Paper sx={{ p: 2 }}>
            <ResponsiveContainer height={300}>
                <ScatterChart width={500} height={300} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis dataKey={'x'} name='stature' unit='cm' />
                    <YAxis dataKey={'y'} name='weight' unit='kg' />
                    <CartesianGrid />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name='A school' data={data} fill='#8884d8' />
                </ScatterChart>
            </ResponsiveContainer>
        </Paper>
    );
}