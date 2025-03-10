
import { ReactNode } from 'react';

// This is a placeholder component for the Helmet functionality
// In a real app, you would use react-helmet or react-helmet-async
interface HelmetProps {
  children: ReactNode;
}

export function Helmet({ children }: HelmetProps) {
  return <>{children}</>;
}
