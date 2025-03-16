import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', paddingTop: 5 }}>
      <Typography variant="h3" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" paragraph>
        Page Not Found
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;