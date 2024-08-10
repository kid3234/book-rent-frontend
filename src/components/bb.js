import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { Box, Typography } from "@mui/material";

const data = [
  { Category: "Fiction", value: 5, color: "#006AFF" },
  { Category: "Self Help", value: 1, color: "#52C93F" },
  { Category: "Business", value: 1, color: "#FF2727" },
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
              {entry.payload.Category}
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