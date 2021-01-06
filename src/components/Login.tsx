import React, { FormEvent, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { login, loginWithGoogle } from '../services/authService';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
} from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password');
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
    } catch (err) {
      setError('Failed to sign in with Google');
    }

    setLoading(false);
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const ErrorBox = () => {
    return (
      <Box
        py={3}
        width="full"
        maxWidth={{ base: 350, sm: 400, md: 500 }}
        borderRadius={4}
        textAlign="center"
        bg="red.400"
        color="white"
        fontSize="lg"
        boxShadow="sm"
      >
        {error}
      </Box>
    );
  };

  return (
    <Stack
      minHeight="100vh"
      align="center"
      justify={{ md: 'center' }}
      mt={{ base: '50', md: '0' }}
    >
      {error.length > 0 && <ErrorBox />}
      <Box
        px={6}
        py={3}
        width="full"
        maxWidth={{ base: 350, sm: 400, md: 500 }}
        textAlign="center"
        borderWidth={1}
        borderRadius={4}
        borderColor="lightgray"
        boxShadow="lg"
      >
        <Box p={6}>
          <Text mb={8} fontSize="xl" textAlign="center" fontFamily="sans-serif">
            Sign In to Your Account
          </Text>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                isRequired={true}
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                autoComplete="new-password"
                type="password"
                isRequired={true}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </FormControl>
            <Button
              type="submit"
              width="full"
              mt={8}
              bg="teal.500"
              color="white"
              _hover={{ bg: 'teal.400' }}
              _active={{ bg: 'teal.500' }}
              _focus={{ border: 'none' }}
              isDisabled={loading}
            >
              Sign In
            </Button>
            <Button
              width="full"
              mt={4}
              bg="gray.500"
              color="white"
              _hover={{ bg: 'gray.400' }}
              _active={{ bg: 'gray.500' }}
              _focus={{ border: 'none' }}
              isDisabled={loading}
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </Button>
          </form>
        </Box>
      </Box>
      <Box fontWeight={400}>
        Don't have an account?
        <Link to="/signup" style={{ color: 'teal', marginLeft: '5px' }}>
          Sign up now.
        </Link>
      </Box>
    </Stack>
  );
};

export default Login;
