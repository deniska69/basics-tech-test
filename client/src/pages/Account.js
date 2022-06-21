import { useState } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '../../src/config';

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
} from '@mui/material';

export default function Account() {
  const currentUser = useSelector(state => state.user.currentUser);

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');
  const [dateBirth, setDateBirth] = useState(currentUser.date_of_birth);
  const [gender, setGender] = useState(currentUser.gender);

  return (
    <Container maxWidth="sm">
      <Typography>{name}</Typography>
      <Typography>{email}</Typography>
      <Typography>{dateBirth}</Typography>
      <Typography>{gender}</Typography>
    </Container>
  );
}
