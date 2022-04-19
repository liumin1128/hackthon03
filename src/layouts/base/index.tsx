import * as React from 'react';
import { IRoute } from 'umi';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const BaseLayout: React.FunctionComponent<IRoute> = (props) => {
  const { children } = props;
  return (
    <Stack
      spacing={2}
      sx={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box sx={{ overflow: 'auto' }}>{children}</Box>
    </Stack>
  );
};

export default BaseLayout;
