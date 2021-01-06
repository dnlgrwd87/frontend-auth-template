import React, { FormEvent, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { loginWithGoogle, signup } from '../services/authService';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
} from '@chakra-ui/react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('A user with that email already exists');
      } else {
        setError('Failed to create account');
      }
    }

    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
    } catch (err) {
      setError('Failed to sign up with Google');
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
            Sign Up for an Account
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
            <FormControl mt={6}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                isRequired={true}
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
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
              Sign Up
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
              onClick={handleGoogleSignup}
            >
              Continue with Google
            </Button>
          </form>
        </Box>
      </Box>
      <Box fontWeight={400}>
        Already have an account?
        <Link to="/login" style={{ color: 'teal', marginLeft: '5px' }}>
          Sign in now.
        </Link>
      </Box>
    </Stack>
  );
};

export default Signup;
