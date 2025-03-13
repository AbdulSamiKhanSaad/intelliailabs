
import { ReactNode } from 'react';
import { Helmet as ReactHelmet, HelmetProvider } from 'react-helmet-async';

// This is a wrapper around react-helmet-async
interface HelmetProps {
  children: ReactNode;
}

export function Helmet({ children }: HelmetProps) {
  return <ReactHelmet>{children}</ReactHelmet>;
}

export function HelmetProvider({ children }: { children: ReactNode }) {
  return <HelmetProvider>{children}</HelmetProvider>;
}
