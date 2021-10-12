import Link from 'next/link';

import { Container } from './styles';

interface ButtonProps {
  children: React.ReactNode;
  size: 'big' | 'medium' | 'adaptative';
  dark?: boolean;
  href: string;
}

export function ButtonLink({ children, size, dark, href }: ButtonProps) {
  return (
    <Link href={href} passHref>
      <Container size={size} dark={dark}>
        {children}
      </Container>
    </Link>
  );
}
