"use client";

import { Button, Container, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Next.js 15 + MUI v5 Demo
      </Typography>
      <Button variant="contained" color="primary">
        Hello MUI
      </Button>
    </Container>
  );
}
