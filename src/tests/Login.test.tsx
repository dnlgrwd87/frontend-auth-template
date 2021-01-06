import * as React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react';
import Login from '../components/Login';
import { MemoryRouter } from 'react-router-dom';

import * as authService from '../services/authService';

describe('Login', () => {
  it('shows error message when log in fails', async () => {
    const { getByTestId, getByLabelText, queryByText } = render(<Login />, {
      wrapper: MemoryRouter,
    });

    const loginMock = jest
      .spyOn(authService, 'login')
      .mockRejectedValue({ email: '', password: '' });

    expect(queryByText(/invalid email or password/i)).not.toBeInTheDocument();

    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'test@test.com' },
    });

    fireEvent.change(getByLabelText(/password/i), {
      target: { value: 'testPassword' },
    });

    fireEvent.submit(getByTestId('form'));

    await waitFor(() =>
      expect(loginMock).toHaveBeenCalledWith('test@test.com', 'testPassword'),
    );
    expect(queryByText(/invalid email or password/i)).toBeInTheDocument();
  });
});
