import {
  alpha,
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  styled,
  Toolbar,
} from "@mui/material";
import theme from "../../theme";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React from "react";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        backgroundImage: "none",
        bgcolor: "transparent",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button variant="text" color="info" size="small">
                所有原材料
              </Button>
              <Button variant="text" color="info" size="small">
                供应商
              </Button>
              <Button variant="text" color="info" size="small">
                所有分类
              </Button>
              <Button variant="text" color="info" size="small">
                测试页面
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0 }}
              >
                关于我们
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0 }}
              >
                新闻
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <Button color="primary" variant="text" size="small">
              登陆
            </Button>
            <Button color="primary" variant="contained" size="small">
              注册
            </Button>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <IconButton aria-label="menu button" onClick={toggleDrawer(true)}>
              <MenuIcon></MenuIcon>
            </IconButton>
          </Box>
          <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
            <Box sx={{ p: 2, backgroundColor: "background.default" }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={toggleDrawer(false)}>
                  <CloseRoundedIcon></CloseRoundedIcon>
                </IconButton>
              </Box>
            </Box>
            <MenuItem>所有原材料</MenuItem>
            <MenuItem>供应商</MenuItem>
            <MenuItem>所有分类</MenuItem>
            <MenuItem>测试页面</MenuItem>
            <MenuItem>关于我们</MenuItem>
            <MenuItem>新闻</MenuItem>
            <Divider sx={{ my: 3 }} />
            <MenuItem>
              <Button color="primary" variant="contained" fullWidth>
                登陆
              </Button>
            </MenuItem>
            <MenuItem>
              <Button color="primary" variant="outlined" fullWidth>
                注册
              </Button>
            </MenuItem>
          </Drawer>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}

export default AppAppBar;
