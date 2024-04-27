import * as React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { blueGrey as cardColor } from "@mui/material/colors";

export default function InferenceStatus() {
  return (
    <Container maxWidth="xl">
      <Stack direction="row" spacing={2}>
        <Card sx={{ backgroundColor: cardColor[700], minWidth: 200 }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="subtitle">Total Inference Count</Typography>
              <Typography variant="caption" display="block">
                282217 <br /> Verified Inferences
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: cardColor[700], minWidth: 200 }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="subtitle">
                Total On-Chain Transaction
              </Typography>
              <Typography variant="caption" display="block">
                1411085 <br /> Transactions
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ backgroundColor: cardColor[700], minWidth: 200 }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="subtitle">Todays Inference Count</Typography>
              <Typography variant="caption" display="block">
                991 <br /> Verified Inferences
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ backgroundColor: cardColor[700], minWidth: 200 }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="subtitle">
                Todays On-Chain transactions
              </Typography>
              <Typography variant="caption" display="block">
                4955 <br /> Transactions
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
