import Link from 'next/link';
import Image from 'next/image';
import { useIntl } from 'react-intl';
import { FiFacebook, FiGlobe, FiInstagram, FiTwitter } from 'react-icons/fi';

import { en } from '../../content/locale';

import {
  Container,
  FooterTop,
  StoreLinks,
  Logo,
  DownloadsLink,
  LinkList,
  LinksSection,
  LinkItem,
  Divider,
  FooterBottom,
  SocialLinks,
} from './styles';

export function Footer() {
  const { formatMessage } = useIntl();
  const f = (id: keyof typeof en) => formatMessage({ id });

  return (
    <Container>
      <FooterTop>
        <StoreLinks>
          <Logo>
            <Image
              src="/assets/logo-light.svg"
              alt="Uber eats"
              width={135}
              height={40}
            />
          </Logo>
          <DownloadsLink>
            <Image
              src="/assets/apple-store.svg"
              alt="Uber eats app"
              width={135}
              height={40}
            />
            <Image
              src="/assets/google-play.png"
              alt="Uber eats app"
              width={135}
              height={40}
              className="footer-android-app"
            />
          </DownloadsLink>
        </StoreLinks>
        <LinkList>
          <LinksSection>
            <LinkItem>
              <Link href="/">
                <a>{f('FOOTER_GET_HELP')}</a>
              </Link>
            </LinkItem>
            <LinkItem>
              <Link href="/">
                <a>{f('FOOTER_ADD_YOUR_RESTAURANT')}</a>
              </Link>
            </LinkItem>
            <LinkItem>
              <Link href="/">
                <a>{f('FOOTER_SIGN_UP_TO_DELIVER')}</a>
              </Link>
            </LinkItem>
            <LinkItem>
              <Link href="/">
                <a>{f('FOOTER_CREATE_BUSINESS_ACC')}</a>
              </Link>
            </LinkItem>
            <LinkItem>
              <Link href="/">
                <a>{f('FOOTER_SAVE_ON_FIRST_ORDER')}</a>
              </Link>
            </LinkItem>
          </LinksSection>
          <LinksSection>
            <LinkItem>
              <Link href="/">
                <a>{f('FOOTER_RESTAURANTS_NEAR')}</a>
              </Link>
            </LinkItem>
            <LinkItem>
              <Link href="/">
                <a>{f('FOOTER_ALL_CITIES')}</a>
              </Link>
            </LinkItem>
            <LinkItem>
              <Link href="/">
                <a>{f('FOOTER_ALL_COUNTRIES')}</a>
              </Link>
            </LinkItem>
            <LinkItem>
              <Link href="/">
                <a>{f('FOOTER_READ_BLOG')}</a>
              </Link>
            </LinkItem>
            <LinkItem>
              <Link href="/">
                <a>{f('FOOTER_ABOUT')}</a>
              </Link>
            </LinkItem>
            <LinkItem>
              <Link href="/">
                <a>
                  <FiGlobe />
                  {f('FOOTER_LANGUAGE')}
                </a>
              </Link>
            </LinkItem>
          </LinksSection>
        </LinkList>
      </FooterTop>
      <Divider />
      <FooterBottom>
        <SocialLinks>
          <Link href="/">
            <a aria-label="Link to Facebook">
              <FiFacebook size={18} color="#fff" />
            </a>
          </Link>
          <Link href="/">
            <a aria-label="Link to Twitter">
              <FiTwitter size={18} color="#fff" />
            </a>
          </Link>
          <Link href="/">
            <a aria-label="Link to Instagram">
              <FiInstagram size={18} color="#fff" />
            </a>
          </Link>
        </SocialLinks>
      </FooterBottom>
    </Container>
  );
}
