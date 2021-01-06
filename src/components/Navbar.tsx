import React from 'react';
import { useAuth } from '../contexts/authContext';
import { useHistory } from 'react-router-dom';
import { logout } from '../services/authService';
import { Box, Flex, Text } from '@chakra-ui/react';

const Navbar = () => {
  const { currentUser } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.push('/login');
  };

  return (
    <Box boxShadow="lg" borderBottom={1}>
      <Flex
        backgroundColor="gray"
        py={4}
        px={10}
        as="nav"
        align="center"
        justifyContent="space-between"
      >
        <Text fontSize="lg" fontWeight="500">
          My App
        </Text>
        {currentUser && (
          <Text
            fontWeight={400}
            color="blue.500"
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
            onClick={handleLogout}
          >
            Logout
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
