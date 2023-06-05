import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';



const OrdersStatistics = () => {
  const [templateOrdersStatistics, setTemplateOrdersStatistics] = useState<any>([
    { name: 'Mon', orders: 0 },
    { name: 'Tue', orders: 0 },
    { name: 'Wed', orders: 0 },
    { name: 'Thu', orders: 0 },
    { name: 'Fri', orders: 0 },
    { name: 'Sat', orders: 0 },
    { name: 'Sun', orders: 0 },
  ]);

  useEffect(() => {
    const _ = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/order/statistics/week/orders`);
      const days = await response.json();
      setTemplateOrdersStatistics(days)
      // console.log(data);

    }
    _()
  }, [])
  return (
    <>
      <Paper sx={{ p: 2 }}>
        <ResponsiveContainer height={300}>
          <LineChart width={600} height={300} data={templateOrdersStatistics}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Tooltip contentStyle={{ color: '#e5b1c8' }} />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </>
  );
};

export default OrdersStatistics;