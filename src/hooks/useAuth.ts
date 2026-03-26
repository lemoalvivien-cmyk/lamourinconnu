import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { isAdmin as checkIsAdmin } from '../lib/utils';

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const isAdmin = checkIsAdmin(context.userRole);

  return {
    ...context,
    isAdmin,
  };
}
