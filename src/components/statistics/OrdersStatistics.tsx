import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper } from '@mui/material';

const data = [
  { name: 'Monday', orders: 120 },
  { name: 'Tuesday', orders: 150 },
  { name: 'Wednesday', orders: 110 },
  { name: 'Thursday', orders: 130 },
  { name: 'Friday', orders: 170 },
  { name: 'Saturday', orders: 190 },
  { name: 'Sunday', orders: 150 },
];

const OrdersStatistics = () => {
  return (
    <>
      <Paper sx={{ p: 2 }}>
        <ResponsiveContainer  height={300}>
          <LineChart width={600} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Tooltip contentStyle={{color: '#e5b1c8'}}/>
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </>
  );
};

export default OrdersStatistics;