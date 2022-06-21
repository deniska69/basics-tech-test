import { useState } from 'react';
import {
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Card,
  CardActions,
  CardContent,
  Select,
  MenuItem,
  Typography,
  Grid,
  Box,
  Button,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateBirth, setDateBirth] = useState('');
  const [gender, setGender] = useState('');

  const [configInputPassword, setConfigInputPassword] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setConfigInputPassword({
      ...configInputPassword,
      showPassword: !configInputPassword.showPassword,
    });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <Card spacing={2} width="sm" sx={{ p: { xs: 2, md: 3 } }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Регистрация
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-name">Имя</InputLabel>
                <OutlinedInput id="outlined-adornment-name" value={name} onChange={e => setName(e.target.value)} label="Имя" />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">Email:</InputLabel>
                <OutlinedInput id="outlined-adornment-email" value={email} onChange={e => setEmail(e.target.value)} label="Имя" />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={configInputPassword.showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  inputProps={{
                    autoComplete: 'new-password',
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                        {configInputPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Пароль"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Пол:</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={gender} label="Пол" onChange={e => setGender(e.target.value)}>
                  <MenuItem value={'М'}>М</MenuItem>
                  <MenuItem value={'Ж'}>Ж</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} display={'flex'} justifyContent={'center'}>
              <Button variant="contained">Зарегистрироваться</Button>
            </Grid>

            <Grid item xs={12}>
              <Box display={'flex'} justifyContent={'center'}>
                Уже есть аккаунт?
                <Link className="linkToAccountPage" to="/account">
                  {'    '}Войти.
                </Link>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Container>
  );
}
