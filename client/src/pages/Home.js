import { useState } from 'react';
import {
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
  Select,
  MenuItem,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  styled,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import PropTypes from 'prop-types';
import { Visibility, VisibilityOff, AddAPhoto, NoPhotography } from '@mui/icons-material';

import './Home.css';

import { useDispatch } from 'react-redux';
import { registration, login } from '../actions/users';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Input = styled('input')({
  display: 'none',
});

export default function Home() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateBirth, setDateBirth] = useState(new Date());
  const [gender, setGender] = useState('');
  const [photo, setPhoto] = useState('');
  const [isPhoto, setIsPhoto] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

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

  const selectTab = () => {
    setEmail('');
    setPassword('');

    if (tabIndex === 0) {
      setTabIndex(1);
    } else if (tabIndex === 1) {
      setTabIndex(0);
    }
  };

  const registrationNow = () => {
    registration(email, password, name, dateBirth, gender === 'М' ? 'male' : 'female');
  };

  const loginNow = () => {
    dispatch(login(email, password));
  };

  const addPhoto = e => {
    const file = e.target.files[0];
    const isImage = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isImage) {
      return alert('Пожалуйста, загрузите изображение');
    }

    const mb = 2;
    if (file.size / 1024 / 1024 > mb) {
      return alert('Пожалуйста, выберите изображение размером менее ' + mb + ' Мбайт');
    }

    setPhoto(file);
    setIsPhoto(true);
    e.target.value = '';
  };

  const removePhoto = () => {
    setPhoto('');
    setIsPhoto(false);
  };

  return (
    <Container maxWidth="sm">
      <Card spacing={2} width="sm" sx={{ xs: 2, md: 3 }}>
        <CardContent>
          <TabPanel value={tabIndex} index={0}>
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

              <Grid item xs={5}>
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

              <Grid item xs={5}>
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

              <Grid item xs={1}>
                {!isPhoto ? (
                  <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={e => addPhoto(e)} />
                    <IconButton color="primary" aria-label="add photo" component="span">
                      <AddAPhoto sx={{ fontSize: '2.5rem' }} />
                    </IconButton>
                  </label>
                ) : (
                  <IconButton color="error" aria-label="delete photo" onClick={removePhoto}>
                    <NoPhotography sx={{ fontSize: '2.5rem' }} />
                  </IconButton>
                )}
              </Grid>

              <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                <Button variant="contained" size="large" onClick={registrationNow}>
                  Зарегистрироваться
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                  <Typography color={'#556cd6'} fontSize={'0.875rem;'} marginRight={'0.5rem'}>
                    УЖЕ ЕСТЬ АККАУНТ?
                  </Typography>
                  <Button variant="outlined" size="medium" onClick={selectTab}>
                    Войти
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabIndex} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" align="center">
                  Авторизация
                </Typography>
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

              <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                <Button variant="contained" size="large" onClick={loginNow}>
                  Войти
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                  <Typography color={'#556cd6'} fontSize={'0.875rem;'} marginRight={'0.5rem'}>
                    НЕТ АККАУНТА?
                  </Typography>
                  <Button variant="outlined" size="medium" onClick={selectTab}>
                    Зарегистрироваться
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
        </CardContent>
      </Card>
    </Container>
  );
}
