import { Container, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <Container maxWidth="sm">
      <Card width="sm" sx={{ xs: 2, md: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" align="center" marginBottom={'3vh'}>
            Ошибка 404 - такой страницы не существует!
          </Typography>
          <Link to="/">Вернуться на главную страницу</Link>
        </CardContent>
      </Card>
    </Container>
  );
}
