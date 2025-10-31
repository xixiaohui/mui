import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { styled } from "@mui/material/styles";
import theme from "@/theme";
import { red } from "@mui/material/colors";

const StyledBox = styled("div")(({ theme }) => ({
  alignSelf: "center",
  width: "100%",
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: "6px solid",
  outlineColor: "hsla(220, 25%, 80%, 0.2)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
  backgroundImage: `url(${
    process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
  }/static/screenshots/material-ui/getting-started/templates/dashboard.jpg)`,
  backgroundSize: "cover",
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
    backgroundImage: `url(${
      process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
    }/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg)`,
    outlineColor: "hsla(220, 20%, 42%, 0.1)",
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        bgcolor: red[100],
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              fontSize: "clamp(3rem,10vw,3.5rem)",
            }}
          >
            所有
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: "inherit",
                color: "primary.main",
                ...theme.applyStyles("dark", {
                  color: "primary.light",
                }),
              })}
            >
              分类
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              width: { sm: "100%", md: "80%" },
            }}
          >
            智选材料（Compocore.com）
            是一个面向复合材料与玻璃纤维行业的智能选材与信息查询平台。
            平台汇聚了全球优质供应商与原材料数据，结合AI智能推荐与价格趋势分析，帮助企业快速找到合适的材料方案。通过直观的分类导航、动态数据图表与智能搜索系统，智选材料让选型、比价与采购决策变得更高效、更科学。
          </Typography>
          <Stack
            direction={{ xs:'column',md:'row'}}
            spacing={1}
            useFlexGap
            sx={{ pt:2, width:{xs:'100%', sm:'350px'}}}
          >
            <InputLabel htmlFor="email-hero" sx={visuallyHidden}>
              邮箱
            </InputLabel>
            <TextField
              id='email-hero'
              hiddenLabel
              size='small'
              variant='outlined'
              aria-label="输入您的邮箱地址"
              placeholder="您的邮箱地址"
              fullWidth
              slotProps={{
                htmlInput: {
                  autoComplete: 'off',
                  'aria-label': '输入您的邮箱地址',
                },
              }}
            >

            </TextField>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ minWidth: 'fit-content' }}
            >
              现在开始
            </Button>
          </Stack>
          <Typography
            variant='caption'
            color="textSecondary"
            sx={{ textAlign: 'center' }}
          >
            🧭 分类导航：快速浏览玻璃纤维、树脂、增强材料等全系列原料
            📊 价格趋势分析：实时追踪各类产品价格变化，辅助采购决策
            🤝 供应商数据整合：连接行业头部品牌与区域经销商
            🧠 AI 智能推荐：根据性能、品牌与应用场景自动匹配最优方案
          </Typography>
          <Typography
            variant='caption'
            color='text.secondary'
            sx={{ textAlign: 'center' }}
          >
            使命： 让每一次选材决策，都基于数据与智能。愿景： 成为新材料产业链的数字化决策中枢。
          </Typography>
        </Stack>
        {/* <StyledBox id="image" /> */}
      </Container>
    </Box>
  );
}

export default Hero;
