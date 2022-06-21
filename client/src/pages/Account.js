import { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  Grid,
  Box,
  Button,
  TextField,
  Paper,
  styled,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useDispatch } from 'react-redux';
import { updateProfile } from '../actions/users';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Account() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');
  const [dateBirth, setDateBirth] = useState(currentUser.date_of_birth);
  const [gender, setGender] = useState(currentUser.gender === 'male' ? 'М' : 'Ж');

  const [configInputPassword, setConfigInputPassword] = useState({
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

  const updateProfileNow = () => {
    dispatch(updateProfile(email, password, name, dateBirth, gender === 'М' ? 'male' : 'female'));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ flexGrow: 1, minHeight: '100vh', paddingTop: '10vh' }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>Тут будет Аватар</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <Grid container spacing={4} padding={2}>
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
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end">
                            {configInputPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Пароль"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Пол:</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      label="Пол"
                      onChange={e => setGender(e.target.value)}>
                      <MenuItem value={'М'}>М</MenuItem>
                      <MenuItem value={'Ж'}>Ж</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
                    <DesktopDatePicker
                      label="Дата рождения"
                      inputFormat="dd/MM/yyyy"
                      value={dateBirth}
                      onChange={setDateBirth}
                      width="100%"
                      renderInput={params => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={6} display={'flex'}>
                  <Button variant="contained" size="large" color="success" sx={{ width: '100%' }} onClick={updateProfileNow}>
                    Сохранить профиль
                  </Button>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
