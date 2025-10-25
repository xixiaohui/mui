import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function GridGuide() {
  // 12列颜色
  const colors = [
    "#e3f2fd", "#bbdefb", "#90caf9", "#64b5f6",
    "#42a5f5", "#2196f3", "#1e88e5", "#1976d2",
    "#1565c0", "#0d47a1", "#82b1ff", "#448aff",
  ];

  
  return (
    <Grid
      container
      columns={12}
      spacing={1} // 列间距
      sx={{
        height: "100vh", // 全屏高
        padding: 1,
      }}
    >
      {colors.map((color, i) => (
        <Grid key={i} size={1}>
          <Box
            sx={{
              backgroundColor: `rgba(250, 150, 243, ${0.5 + i * 0.05})`,
              height: "100%",
              minHeight: 100,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {i + 1}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
