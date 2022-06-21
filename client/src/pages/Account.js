import { useState, useEffect } from 'react';
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
  Card,
  CardMedia,
  Stack,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Visibility, VisibilityOff, NoPhotography, AddAPhoto } from '@mui/icons-material';

import { useDispatch } from 'react-redux';
import { updateProfile, deleteAvatar, uploadAvatar } from '../actions/users';

import { API_URL } from '../config';
import avatarDefault from '../assets/avatarDefault.jpg';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Input = styled('input')({
  display: 'none',
});

export default function Account() {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.currentUser);

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');
  const [dateBirth, setDateBirth] = useState(currentUser.date_of_birth);
  const [gender, setGender] = useState(currentUser.gender === 'male' ? 'М' : 'Ж');
  const [avatar, setAvatar] = useState(currentUser.avatar);

  useEffect(() => {
    setAvatar(currentUser.avatar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

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

  const deleteAvatarNow = () => {
    dispatch(deleteAvatar());
  };

  const uploadAvatarNow = e => {
    const file = e.target.files[0];
    const isImage = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isImage) {
      return alert('Пожалуйста, загрузите изображение. (JPG/JPEG/PNG)');
    }

    const mb = 2;
    if (file.size / 1024 / 1024 > mb) {
      return alert('Пожалуйста, выберите изображение размером менее ' + mb + ' Мбайт');
    }

    dispatch(uploadAvatar(file));
    e.target.value = '';
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ flexGrow: 1, minHeight: '100vh', paddingTop: '10vh' }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card>
              <CardMedia component="img" height={'100%'} image={avatar === '' ? avatarDefault : `${API_URL + '\\avatars\\' + avatar}`} alt="Avatar" />
            </Card>
            <Stack direction="row" spacing={2} sx={{ marginTop: '1rem' }}>
              <Button variant="contained" color="error" startIcon={<NoPhotography />} onClick={() => deleteAvatarNow()}>
                Удалить
              </Button>
              <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={e => uploadAvatarNow(e)} />
                <Button variant="contained" component="span" color="info" endIcon={<AddAPhoto />}>
                  Изменить
                </Button>
              </label>
            </Stack>
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
