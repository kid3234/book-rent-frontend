import React, { useEffect, useState } from "react";
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

const EarningsSummaryChart = ({ incomeGraph }) => {
  const [data, setData] = useState();

  const getMonthName = (monthNumber) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames[monthNumber - 1];
  };

  const transformData = (incomeGraph) => {
    console.log('incomeGraph',incomeGraph);
    
    if (
      !incomeGraph ||
      !incomeGraph.last6MonthsIncome ||
      !incomeGraph.samePeriodLastYearIncome
    ) {
      console.error("Invalid data structure");
      return [];
    }

    const last6Months = incomeGraph.last6MonthsIncome.reduce((acc, item) => {
      const monthNumber = Number(item.month);
      if (isNaN(monthNumber) || item.totalIncome == null) return acc; // Skip invalid data

      const monthName = getMonthName(monthNumber);
      acc[monthName] = {
        name: monthName,
        last6Months: item.totalIncome,
        lastYear: 0,
      };
      return acc;
    }, {});

    incomeGraph.samePeriodLastYearIncome.forEach((item) => {
      const monthNumber = Number(item.month);
      if (isNaN(monthNumber) || item.totalIncome == null) return; // Skip invalid data

      const monthName = getMonthName(monthNumber);
      if (last6Months[monthName]) {
        last6Months[monthName].lastYear = item.totalIncome;
      } else {
        last6Months[monthName] = {
          name: monthName,
          last6Months: 0,
          lastYear: item.totalIncome,
        };
      }
    });

    return Object.values(last6Months);
  };

  useEffect(() => {
    // const data = ;
    setData(transformData(incomeGraph));
   
  }, [incomeGraph]);

  console.log("income graph", data);


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
