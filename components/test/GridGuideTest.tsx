import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function GridGuideTest() {
  const colors = [
    "#e3f2fd", "#bbdefb", "#90caf9", "#64b5f6",
    "#42a5f5", "#2196f3", "#1e88e5", "#1976d2",
    "#1565c0", "#0d47a1", "#82b1ff", "#448aff",
  ];

  return (
    <Box sx={{ position: "relative", height: "100vh", p: 2 }}>
      {/* === 背景：12列彩色布局 === */}
      <Grid container columns={12} spacing={1} sx={{ height: "100%" }}>
        {colors.map((color, i) => (
          <Grid key={i} size={1}>
            <Box
              sx={{
                backgroundColor: color,
                height: "100%",
                borderRadius: 1,
                opacity: 0.5, // 半透明方便看组件
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

      {/* === 前景：放置一个测试组件 === */}
      <Grid
        container
        columns={12}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          p: 2,
          pointerEvents: "none", // 不影响鼠标事件
        }}
      >
        {/* 让这个元素占第 3 到第 6 列（共 4 列） */}
        <Grid size={{ xs: 12, md: 4 }} sx={{ gridColumnStart: 3 }}>
          <Box
            sx={{
              backgroundColor: "rgba(255, 0, 0, 0.8)",
              color: "#fff",
              p: 2,
              borderRadius: 2,
              pointerEvents: "auto", // 允许点击
            }}
          >
            <h3>测试组件区域</h3>
            <Button variant="contained" color="secondary">
              测试按钮
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
