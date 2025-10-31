import { Box, Grid, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

const lightModeLogos = [
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg",
];

const logoStyle = {
  width: "100px",
  height: "80px",
  margin: "0 32px",
  opacity: 0.7,
};

function LogoCollection() {
  return (
    <Box 
    id="LogoCollection"
    bgcolor={red[100]}
    sx={{
        py: 4,
        
    }}
    >
      <Typography
        component="p"
        variant="subtitle2"
        align="center"
        sx={{ color: "text.secondary" }}
      >
        合作企业
      </Typography>
      <Grid
        container
        sx={{
          justifyContent: "center",
          mt: 0.5,
          opacity: 0.6,
        }}
      >
        {lightModeLogos.map((logo, index) => (
          <Grid key={index}>
            <img
              src={logo}
              alt={`Fake company number ${index + 1}`}
              style={logoStyle}
            ></img>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default LogoCollection;
