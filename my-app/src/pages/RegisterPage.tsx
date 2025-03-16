import { TextField, Button, Container, Typography } from '@mui/material';

const RegisterPage = () => {
  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          type="text"
          slotProps={{
            input: {
              style: { backgroundColor: 'white' },
            },
          }}
        />
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
        <TextField
          label="Confirm Password"
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
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegisterPage;