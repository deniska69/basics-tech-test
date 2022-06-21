import { Container, Card, CardContent, Alert } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <Container maxWidth="sm">
      <Card width="sm" sx={{ xs: 2, md: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Alert severity="error" sx={{ marginBottom: '2vh' }}>
            Ошибка! Такой страницы не существует, или у вас нет доступа для просмотра.
          </Alert>
          <Link to="/">Вернуться на главную страницу</Link>
        </CardContent>
      </Card>
    </Container>
  );
}
