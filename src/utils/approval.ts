import type { User } from '@/types';

export const canAccessSystem = (user: User | null): boolean => {
  if (!user) return false;

  // Admin users don't need approval
  if (user.role === 'admin') return true;

  // Check if user is approved
  return user.isApproved === true ||
         user.approvalStatus === 'APPROVED' ||
         user.approvalStatus === 'AUTO_APPROVED';
};

export const getApprovalMessage = (user: User | null): string | null => {
  if (!user) return null;

  if (canAccessSystem(user)) return null;

  return "Your registration is pending admin approval. You will be automatically approved after 24 hours if admin doesn't respond. For immediate access, contact admin at: gajjelasuryateja2021@gmail.com";
};
