// components/auth/ProtectedAction.tsx
"use client";

import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import {
  ReactNode,
  MouseEvent,
  cloneElement,
  isValidElement,
  ReactElement,
  useCallback,
} from 'react';
import toast from 'react-hot-toast';

interface ProtectedActionProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  href?: string;
  requiredRole?: 'user' | 'moderator' | 'admin' | null;
  redirectTo?: string;
  allowExternalNavigation?: boolean;
}

const ProtectedAction = ({
  children,
  onClick,
  href,
  requiredRole = null,
  redirectTo = '/authpage',
  allowExternalNavigation = false,
}: ProtectedActionProps) => {
  const { currentUser, loading, isAdmin, isModerator } = useAuth();
  const router = useRouter();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (loading) {
        return;
      }

      // Authentication check
      if (!currentUser) {
        e.preventDefault(); // Prevent default only for redirect
        toast.error('Please log in to perform this action');
        router.push(redirectTo);
        return;
      }

      // Role-based authorization check
      let isAuthorized = true;
      if (requiredRole) {
        if (requiredRole === 'admin' && !isAdmin) {
          isAuthorized = false;
        }
        if (requiredRole === 'moderator' && !isModerator) {
          isAuthorized = false;
        }
      }

      if (!isAuthorized) {
        e.preventDefault(); // Prevent default only for unauthorized
        if (requiredRole === 'admin') {
          toast.error('Admin privileges required for this action');
        } else if (requiredRole === 'moderator') {
          toast.error('Moderator privileges required for this action');
        }
        if (redirectTo) {
          router.push(redirectTo);
        }
        return;
      }

      // Allow native click event to propagate if authorized and no custom onClick/href
      if (allowExternalNavigation && onClick) {
        onClick(e);
        return;
      }

      // Execute onClick if provided
      if (onClick) {
        onClick(e);
      }

      // Navigate if href is provided
      if (href && (!onClick || allowExternalNavigation)) {
        e.preventDefault(); // Prevent default for href navigation
        router.push(href);
      }
    },
    [currentUser, loading, requiredRole, isAdmin, isModerator, onClick, href, router, redirectTo, allowExternalNavigation]
  );

  if (!isValidElement(children)) {
    return <>{children}</>;
  }

  const element = children as ReactElement<
    React.HTMLAttributes<HTMLElement> & { disabled?: boolean; href?: string }
  >;

  return cloneElement(element, {
    onClick: handleClick,
    ...(element.type === 'button' || element.type === 'input'
      ? { disabled: loading || element.props.disabled }
      : {}),
    href: href || element.props.href,
    style: {
      ...element.props.style,
      cursor: loading ? 'wait' : element.props.style?.cursor || 'pointer',
    },
  });
};

export default ProtectedAction;