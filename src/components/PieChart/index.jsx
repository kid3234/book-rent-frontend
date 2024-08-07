// import React from 'react';
// import { PieChart, Pie, Cell, Legend } from 'recharts';

// const data = [
//   { name: 'Fiction', value: 54, color: '#0088FE' },
//   { name: 'Self Help', value: 20, color: '#00C49F' },
//   { name: 'Business', value: 26, color: '#FF8042' },
// ];

// // const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
// //   const RADIAN = Math.PI / 180;
// //   const radius = 25 + innerRadius + (outerRadius - innerRadius);
// //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
// //   const y = cy + radius * Math.sin(-midAngle * RADIAN);

// //   return (
// //     <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
// //       {`${data[index].name} ${data[index].value}`}
// //     </text>
// //   );
// // };

// export default function NewPieChart() {
//   return (
//     <div style={{ textAlign: 'center' }}>

//       <PieChart width={400} height={300}>
//         <Pie
//           data={data}
//           cx={200}
//           cy={150}
//           innerRadius={60}
//           outerRadius={80}
//         //   label={renderCustomLabel}
//           dataKey="value"
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={entry.color} />
//           ))}
//         </Pie>
//         <Legend />
//       </PieChart>
//     </div>
//   );
// }

import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { Box, Typography } from "@mui/material";

const data = [
  { name: "Fiction", value: 54, color: "#006AFF" },
  { name: "Self Help", value: 20, color: "#52C93F" },
  { name: "Business", value: 26, color: "#FF2727" },
];

const CustomLegend = (props) => {
  const { payload } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        paddingLeft: 12,
        gap: 1,
        paddingTop: 4,
        width: "100%",
      }}
    >
      {payload.map((entry, index) => (
        <Box
          key={`item-${index}`}
          sx={{ display: "flex", alignItems: "center", marginBottom: 0.5 }}
        >
          <Box
            sx={{
              width: 15,
              height: 15,
              backgroundColor: entry.payload.color,
              borderRadius: "50%",
              marginRight: 1,
              display: "flex",
              gap: 4,
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" sx={{ marginRight: 1 }}>
              {entry.payload.name}
            </Typography>
            <Typography variant="body2">{entry.payload.value}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default function NewPieChart() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 0,
        width: "60%",
      }}
    >
      <Box sx={{ marginBottom: 2 }}>
        <PieChart width={260} height={260}>
          <Pie
            data={data}
            cx={170}
            cy={80}
            innerRadius={50}
            outerRadius={80}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          <Legend content={<CustomLegend />} />
        </PieChart>
      </Box>
    </Box>
  );
}
