import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface BlockedUser {
  id: string;
  blocked_id: string;
  created_at: string;
  blocked_user: {
    id: string;
    first_name: string;
  };
}

export function useBlocks() {
  const { user } = useAuth();
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchBlockedUsers();
    }
  }, [user]);

  const fetchBlockedUsers = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('blocks')
        .select(
          `
          id,
          blocked_id,
          created_at,
          blocked_user:profiles!blocks_blocked_id_fkey(id, first_name)
        `
        )
        .eq('blocker_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setBlockedUsers((data as any) || []);
    } catch {
      setError('Impossible de charger la liste des utilisateurs bloqués');
    } finally {
      setLoading(false);
    }
  };

  const blockUser = async (blockedId: string) => {
    if (!user) return;

    try {
      const { error: blockError } = await supabase.from('blocks').insert({
        blocker_id: user.id,
        blocked_id: blockedId,
      });

      if (blockError) throw blockError;

      await fetchBlockedUsers();
    } catch (err: any) {
      if (err.code === '23505') {
        throw new Error('Cet utilisateur est déjà bloqué');
      }
      throw err;
    }
  };

  const unblockUser = async (blockedId: string) => {
    if (!user) return;

    try {
      const { error: unblockError } = await supabase
        .from('blocks')
        .delete()
        .eq('blocker_id', user.id)
        .eq('blocked_id', blockedId);

      if (unblockError) throw unblockError;

      await fetchBlockedUsers();
    } catch (err) {
      throw err;
    }
  };

  const isUserBlocked = (userId: string): boolean => {
    return blockedUsers.some((block) => block.blocked_id === userId);
  };

  const getBlockedUserIds = (): string[] => {
    return blockedUsers.map((block) => block.blocked_id);
  };

  return {
    blockedUsers,
    loading,
    error,
    blockUser,
    unblockUser,
    isUserBlocked,
    getBlockedUserIds,
    refetch: fetchBlockedUsers,
  };
}
