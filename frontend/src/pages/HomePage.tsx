import { Button, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login());
    navigate('/dashboard');
  };

  return (
    <Container>
      <h1>Home Page</h1>
      <Button variant="contained" onClick={handleLogin}>
        Log In
      </Button>
    </Container>
  );
};

export default HomePage;
