import { TextField, Button, Container, Typography } from '@mui/material';

const LoginPage = () => {
  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          slotProps={{
            input: {
              style: { backgroundColor: 'white' },
            },
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          slotProps={{
            input: {
              style: { backgroundColor: 'white' },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;