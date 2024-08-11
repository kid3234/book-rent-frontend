import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { Box, Typography } from "@mui/material";

const COLORS = ["#006AFF", "#52C93F", "#FF2727", "#FFD700", "#8A2BE2"];

const CustomLegend = (props) => {
  const { payload } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        paddingLeft: 10,
        gap: 1,
        paddingTop: 2,
        width: "100%",
      }}
    >
      {payload?.map((entry, index) => (
        <Box
          key={`item-${index}`}
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 0.5,
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: 15,
              height: 15,
              backgroundColor: entry.payload.color,
              borderRadius: "50%",
              marginRight: 1,
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%", 
            }}
          >
            <Typography variant="body2">{entry.payload.category}</Typography>
            <Typography variant="body2">{entry.payload.value}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default function NewPieChart({ data }) {
  const dataWithColors = data?.map((item, index) => ({
    ...item,
    value: Number(item.value),
    color: COLORS[index % COLORS.length],
  }));

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
      <Box sx={{ marginBottom: 1 }}>
        <PieChart width={280} height={230}>
          <Pie
            data={dataWithColors}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            dataKey="value"
            nameKey="category" 
          >
            {dataWithColors?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend content={<CustomLegend />} />
        </PieChart>
      </Box>
    </Box>
  );
}
