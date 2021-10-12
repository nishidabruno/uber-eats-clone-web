import Link from 'next/link';
import { Container } from './styles';

interface RectButton {
  children: React.ReactNode;
  href: string;
}

export function RectButtonLink({ children, href }: RectButton) {
  return (
    <Link href={href} passHref>
      <Container href={href}>{children}</Container>
    </Link>
  );
}
