import * as React from "react";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import EdgesensorHighRoundedIcon from "@mui/icons-material/EdgesensorHighRounded";
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";
import {
  Box,
  Button,
  Card,
  Container,
  styled,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MuiChip from "@mui/material/Chip";

const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: "Dashboard",
    description:
      "This item could provide a snapshot of the most important metrics or data points related to the product.",
    imageLight: `url("${
      process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
    }/static/images/templates/templates-images/dash-light.png")`,
    imageDark: `url("${
      process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
    }/static/images/templates/templates-images/dash-dark.png")`,
  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: "Mobile integration",
    description:
      "This item could provide information about the mobile app version of the product.",
    imageLight: `url("${
      process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
    }/static/images/templates/templates-images/mobile-light.png")`,
    imageDark: `url("${
      process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
    }/static/images/templates/templates-images/mobile-dark.png")`,
  },
  {
    icon: <DevicesRoundedIcon />,
    title: "Available on all platforms",
    description:
      "This item could let users know the product is available on all platforms, such as web, mobile, and desktop.",
    imageLight: `url("${
      process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
    }/static/images/templates/templates-images/devices-light.png")`,
    imageDark: `url("${
      process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
    }/static/images/templates/templates-images/devices-dark.png")`,
  },
];

interface ChipProps {
  selected?: boolean;
}

const Chip = styled(MuiChip)<ChipProps>(({ theme }) => ({
  variants: [
    {
      props: ({ selected }) => !!selected,
      style: {
        background:
          "linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))",
        color: "hsl(0, 0%, 100%)",
        borderColor: (theme.vars || theme).palette.primary.light,
        "& .MuiChip-label": {
          color: "hsl(0, 0%, 100%)",
        },
        ...theme.applyStyles("dark", {
          borderColor: (theme.vars || theme).palette.primary.dark,
        }),
      },
    },
  ],
}));

interface MobileLayoutProps {
  selectedItemIndex: number;
  handleItemClick: (index: number) => void;
  selectedFeature: (typeof items)[0];
}
export function MobileLayout({
  selectedItemIndex,
  handleItemClick,
  selectedFeature,
}: MobileLayoutProps) {
  if (!items[selectedItemIndex]) {
    return null;
  }

  return (
    <Box
      sx={{
        display: { xs: "flex", sm: "none" },
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2, overflow: "auto" }}>
        {items.map(({ title }, index) => (
          <Chip
            size="medium"
            key={index}
            label={title}
            onClick={() => handleItemClick(index)}
            selected={selectedItemIndex === index}
          />
        ))}
      </Box>
      <Card variant="outlined">
        <Box
          sx={(theme) => ({
            mb: 2,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: 280,
            backgroundImage: "var(--items-imageLight)",
            ...theme.applyStyles("dark", {
              backgroundImage: "var(--items-imageDark)",
            }),
          })}
          style={
            items[selectedItemIndex]
              ? ({
                  "--items-imageLight": items[selectedItemIndex].imageLight,
                  "--items-imageDark": items[selectedItemIndex].imageDark,
                } as any)
              : {}
          }
        />
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography
            gutterBottom
            sx={{ color: "text.primary", fontWeight: "medium" }}
          >
            {selectedFeature.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
            {selectedFeature.description}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

export default function Features() {
  const [selectedItemIndex, setSelectItemIndex] = React.useState(0);

  const handleItemClick = (index: number) => {
    setSelectItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Box
      id="features"
      sx={{
       
        py: { xs: 8, sm: 16 },
      }}
    >
      <Box
        sx={{
          width: { sx: "100%", md: "60%" },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          所有供应商
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: { xs: 2, sm: 4 } }}
        >
          智选材料（Compocore）
          是一个面向新材料行业的智能选材与数据分析平台，致力于让材料决策更高效、更科学。平台通过整合玻璃纤维、树脂、助剂、复合材料等核心原料的品牌数据、技术参数、价格走势与供应商信息，帮助企业快速筛选最优方案。
          借助 AI 智能匹配引擎 与 可视化趋势分析工具，用户可以： 🔍
          一键查询全球主流原材料及性能数据 📊 实时对比价格变化与品牌差异 🤝
          精准对接优质供应商资源 💬 获取行业知识与技术解读
          无论是产品研发、采购决策，还是市场洞察，智选材料都为材料工程师与供应链团队提供可靠的智能助手。
          让每一次选材决策，都更快、更准、更有数据支撑。
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row-reverse" },
          gap: 2,
        }}
      >
        <div>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Box
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={[
                  (theme) => ({
                    p: 2,
                    height: "100%",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: (theme.vars || theme).palette.action
                        .hover,
                    },
                  }),
                  selectedItemIndex === index && {
                    backgroundColor: "action.selected",
                  },
                ]}
              >
                <Box
                  sx={[
                    {
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "left",
                      gap: 1,
                      textAlign: "left",
                      textTransform: "none",
                      color: "text.secondary",
                    },
                    selectedItemIndex === index && {
                      color: "text.primary",
                    },
                  ]}
                >
                  {icon}

                  <Typography variant="h6">{title}</Typography>
                  <Typography variant="body2">{description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <MobileLayout
            selectedItemIndex={selectedItemIndex}
            handleItemClick={handleItemClick}
            selectedFeature={selectedFeature}
          />
        </div>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            width: { xs: "100%", md: "70%" },
            height: "var(--items-image-height)",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              width: "100%",
              display: { xs: "none", sm: "flex" },
              pointerEvents: "none",
            }}
          >
            <Box
              sx={(theme) => ({
                m: "auto",
                width: 420,
                height: 500,
                backgroundSize: "contain",
                backgroundImage: "var(--items-imageLight)",
                ...theme.applyStyles("dark", {
                  backgroundImage: "var(--items-imageDark)",
                }),
              })}
              style={
                items[selectedItemIndex]
                  ? ({
                      "--items-imageLight": items[selectedItemIndex].imageLight,
                      "--items-imageDark": items[selectedItemIndex].imageDark,
                    } as any)
                  : {}
              }
            />
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
