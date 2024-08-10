import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography, Box } from "@mui/material";

const data = [
  { name: "May", last6Months: 200, lastYear: 150 },
  { name: "Jun", last6Months: 250, lastYear: 100 },
  { name: "Jul", last6Months: 180, lastYear: 160 },
  { name: "Aug", last6Months: 220, lastYear: 180 },
  { name: "Sep", last6Months: 210, lastYear: 170 },
  { name: "Oct", last6Months: 240, lastYear: 190 },
];

const EarningsSummaryChart = () => {
  return (
    <Paper
      style={{
        padding: "24px",
        borderRadius: "10px",
        backgroundColor: "#F6F8FA",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Earning Summary
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Mar 2022 - Oct 2024
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box display="flex" alignItems="center" marginRight="16px">
            <Box
              width="12px"
              height="12px"
              bgcolor="#007FFF"
              borderRadius="50%"
              marginRight="8px"
            />
            <Typography variant="body2" color="textSecondary">
              Last 6 months
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box
              width="12px"
              height="12px"
              bgcolor="#C0C0C0"
              borderRadius="50%"
              marginRight="8px"
            />
            <Typography variant="body2" color="textSecondary">
              Same period last year
            </Typography>
          </Box>
        </Box>
      </Box>

      <ResponsiveContainer width="100%" height={160}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorLast6Months" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#007FFF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#007FFF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorLastYear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C0C0C0" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#C0C0C0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis
            tickFormatter={(value) => `${value}k`}
            tickLine={false}
            axisLine={false}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="last6Months"
            stroke="#007FFF"
            fillOpacity={1}
            fill="url(#colorLast6Months)"
          />
          <Area
            type="monotone"
            dataKey="lastYear"
            stroke="#C0C0C0"
            fillOpacity={1}
            fill="url(#colorLastYear)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default EarningsSummaryChart;
