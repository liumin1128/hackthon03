import { ReactNode } from 'react';
import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
// import Card from '@mui/material/Card';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MaterialUISwitch from '@/components/MaterialUISwitch';

interface Props {
  children: ReactNode;
}

export default function Home({ children }: Props) {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Stack spacing={4}>
      <AppBar color="default" position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hackthon03
          </Typography>
          <MaterialUISwitch />
        </Toolbar>
      </AppBar>

      <Stack>
        <Container fixed sx={{ p: isUpMd ? undefined : 0 }}>
            {children}
        </Container>
      </Stack>
      <Stack />
    </Stack>
  );
}
