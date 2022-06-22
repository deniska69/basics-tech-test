import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { Container, Box, Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

import { allUsers } from '../actions/users';
// eslint-disable-next-line
import { API_URL } from '../config';
// eslint-disable-next-line
import avatarDefault from '../assets/avatarDefault.jpg';

export default function Account() {
  // eslint-disable-next-line
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const listUsers = useSelector(state => state.user.listUsers);
  //console.log(listUsers);

  useEffect(() => {
    dispatch(allUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ flexGrow: 1, marginTop: '3vh', marginBottom: '3vh' }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 10, md: 16 }}>
          {listUsers.map((user, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Card sx={{ maxWidth: 200 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={user.avatar === '' || user.avatar === undefined ? avatarDefault : `${API_URL + '\\avatars\\' + user.avatar}`}
                  alt="Avatar"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Возраст: {Math.floor((new Date() - new Date(user.date_of_birth)) / (1000 * 60 * 60 * 24 * 30 * 12))}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
