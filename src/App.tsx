import React from 'react';
import { AuthProvider } from './contexts/authContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/routes/PrivateRoute';

const App = () => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="*" component={() => <div>Page not found!</div>} />
          </Switch>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
