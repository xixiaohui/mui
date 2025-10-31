import * as React from "react";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import EdgesensorHighRoundedIcon from "@mui/icons-material/EdgesensorHighRounded";
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";
import { Box, Container, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

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

export default function Features() {
  const [selectedItemIndex, setSelectItemIndex] = React.useState(0);

  const handleItemClick = (index: number) => {
    setSelectItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container
      id="features"
      sx={{
        bgcolor: red[100],
        py: { xs: 8, sm: 16 },
      }}
    >
      <Box sx={{ 
        
        width: { sx: "100%", md: "60%" } }}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          所有供应商
        </Typography>
      </Box>
    </Container>
  );
}
