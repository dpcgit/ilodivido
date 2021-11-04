import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';


export default function Preferences() {
  const [radius, setRadius] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    setRadius(newValue);
  };

  const handleInputChange = (event) => {
    setRadius(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (radius < 0) {
      setRadius(0);
    } else if (radius > 100) {
      setRadius(100);
    }
  };

  const Input = styled(MuiInput)`
  width: 42px;
`;

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        Radius
      </Typography>
      <Grid container spacing={2} alignItems="center">

        <Grid item xs>
          <Slider
            value={typeof radius === 'number' ? radius : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={radius}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
