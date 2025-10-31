"use client";

import {
  Grid,
  Box,
  Typography,
  ButtonBase,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Button } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import GridGuide from "@/components/test/GridGuide";
import GridGuideTest from "@/components/test/GridGuideTest";
import BoxGuide from "@/components/test/BoxGuide";
import MenuTest from "@/components/test/MenuTest";
import RecipeReviewCard from "@/components/test/RecipeReviewCard";
import BasicRichTreeView from "@/components/test/BasicRichTreeView";
import FooterMaterial from "@/components/FooterMaterial";
import DateCalendarValue from "@/components/test/DateCalendarValue";
import AppAppBar from "@/components/test/AppAppBar";

import { grey } from "@mui/material/colors";
import ActionAreaCard from "@/components/test/ActionAreaCard";
import Hero from "@/components/test/Hero";
import LogoCollection from "@/components/test/LogoCollection";
import Features from "@/components/test/Features";

const rows: GridRowsProp = [
  { id: 1, name: "Data Grid", description: "the Community version" },
  { id: 2, name: "Data Grid Pro", description: "the Pro version" },
  { id: 3, name: "Data Grid Premium", description: "the Premium version" },
];

const columns: GridColDef[] = [
  { field: "name", headerName: "Product Name", width: 200 },
  { field: "description", headerName: "Description", width: 300 },
];

function ColorfulGridTest() {
  const colors = [
    "#e3f2fd",
    "#bbdefb",
    "#90caf9",
    "#64b5f6",
    "#42a5f5",
    "#2196f3",
    "#1e88e5",
    "#1976d2",
    "#1565c0",
    "#0d47a1",
    "#82b1ff",
    "#448aff",
  ];

  return (
    <Grid container spacing={2} columns={12}>
      {/* {
        colors.map((color,index)=>(
          <Grid key={index} size={{ xs: 6, sm: 4, md: 1 }}>
            <Box
              sx={{
                backgroundColor: color,
                height: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
            </Box>
          </Grid>
        ))
      } */}
      <Grid size={4}>
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: ["bar A", "bar B", "bar C"],
            },
          ]}
          series={[
            {
              data: [2, 5, 3],
            },
          ]}
          height={300}
        />
      </Grid>

      <Grid size={6}>
        <DataGrid rows={rows} columns={columns} />
      </Grid>

      <Grid size={4}>
        <Box sx={{ minHeight: 352, minWidth: 250 }}>
          <SimpleTreeView>
            <TreeItem itemId="grid" label="Data Grid">
              <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
              <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
              <TreeItem
                itemId="grid-premium"
                label="@mui/x-data-grid-premium"
              />
            </TreeItem>
            <TreeItem itemId="pickers" label="Date and Time Pickers">
              <TreeItem
                itemId="pickers-community"
                label="@mui/x-date-pickers"
              />
              <TreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
            </TreeItem>
            <TreeItem itemId="charts" label="Charts">
              <TreeItem itemId="charts-community" label="@mui/x-charts" />
              <TreeItem itemId="charts-pro" label="@mui/x-charts-pro" />
            </TreeItem>
            <TreeItem itemId="tree-view" label="Tree View">
              <TreeItem itemId="tree-view-community" label="@mui/x-tree-view" />
              <TreeItem itemId="tree-view-pro" label="@mui/x-tree-view-pro" />
            </TreeItem>
          </SimpleTreeView>
        </Box>
      </Grid>
    </Grid>
  );
}

function PageLayout() {
  return (
    <Grid container spacing={2} columns={12} sx={{ minHeight: "100vh" }}>
      {/* 导航 */}
      <Grid size={{ xs: 12, md: 2 }}>
        <Nav></Nav>
      </Grid>
      {/* 主内容 + 侧栏 */}
      <Grid size={{ xs: 12, md: 8 }}>
        <Main />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <Sidebar />
      </Grid>

      {/* 底部：让它跨 12 列 */}
      <Grid size={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}

function OverlayGrid() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        pointerEvents: "none", // 不影响操作
        zIndex: 9999,
        opacity: 0.2,
      }}
    >
      <GridGuide />
    </Box>
  );
}

function OverlayGridTest() {
  return <GridGuideTest></GridGuideTest>;
}

function BoxGuidePlay() {
  return (
    <>
      <BoxGuide></BoxGuide>
    </>
  );
}

function Nav() {
  return (
    <Box sx={{ p: 2 }}>
      <BasicRichTreeView></BasicRichTreeView>
    </Box>
  );
}

function Main() {
  const num: number = 30;

  return (
    <Box
      sx={{
        bgcolor: "white.100",
        p: 2,
        height: "auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      {[...Array(num)].map((_, i) => (
        <RecipeReviewCard key={i}></RecipeReviewCard>
      ))}
    </Box>
  );
}
function Sidebar() {
  return (
    <Box sx={{ p: 1 }}>
      <Button variant="outlined" sx={{ m: 1 }}>
        玻纤
      </Button>
      <Button variant="outlined" sx={{ m: 1 }}>
        树脂
      </Button>
    </Box>
  );
}
function Footer() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <FooterMaterial></FooterMaterial>
    </Box>
  );
}

function TopNav() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h2" component="h2" sx={{ p: 2 }}>
          COMPOCORE.AI
        </Typography>
        <Button> Learn More</Button>
      </Box>
    </>
  );
}

function FiexdNav() {
  return (
    <>
      <Box
        sx={{
          position: "fixed", // 固定定位
          top: 0, // 固定在页面顶部
          left: 0, // 靠左
          width: "100%", // 占满宽度

          p: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <MenuTest></MenuTest>
        <MenuTest></MenuTest>
        <MenuTest></MenuTest>
        <MenuTest></MenuTest>
      </Box>
    </>
  );
}


function TopNavMenu() {
  return <AppAppBar></AppAppBar>;
}

function TestDetailPage() {
  return (
    <>
      <Grid container spacing={2} columns={12}>
        {/* 顶部导航 */}
        <Grid size={12}>
          <TopNavMenu></TopNavMenu>
        </Grid>

        {/* 左侧导航 */}
        <Grid size={{ xs: 12, md: 2 }}>
          <Nav></Nav>
        </Grid>

        {/* 主内容 + 侧栏 */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Main />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <Sidebar />
        </Grid>

        {/* 底部：让它跨 12 列 */}
        <Grid size={12}>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
}

function TestHomePage() {
  return (
    <>
      <Grid container spacing={2} columns={12}>
        {/* 顶部导航 */}
        <Grid size={12}>
          <TopNavMenu></TopNavMenu>
        </Grid>
        
        <Grid size={{ xs:12,md:12,lg:8}} offset={{ xs: 0, md: 0, lg: 2 }}>
          <Hero></Hero>
          <LogoCollection></LogoCollection>
          <Features></Features>
        </Grid>
        <Grid
          size={{ xs: 12, md: 12, lg: 8 }}
          offset={{ xs: 0, md: 0, lg: 2 }}
          sx={{ minHeight: "100vh" }}
        >
          <Box sx={{ bgcolor: grey[100], minHeight: "100%" }}>
            <ActionAreaCard></ActionAreaCard>
          </Box>
        </Grid>

        {/* 底部：让它跨 12 列 */}
        <Grid size={12}>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
}

export default TestHomePage;
