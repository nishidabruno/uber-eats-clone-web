import Link from 'next/link';
import Image from 'next/image';
import { FiFacebook, FiGlobe, FiInstagram, FiTwitter } from 'react-icons/fi';

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
                <a>問い合わせる</a>
              </Link>
            </LinkItem>
            <LinkItem>
              <Link href="/">
                <a>加盟レストランとして登録する</a>
              </Link>
            </LinkItem>
            <LinkItem>
              <Link href="/">
                <a>登録して配達を開始する</a>
              </Link>
            </LinkItem>
            <LinkItem>
              <Link href="/">
                <a>ビジネス用アカウントを作成する</a>
              </Link>
            </LinkItem>
            <LinkItem>
              <Link href="/">
                <a>初回の注文がお得に</a>
              </Link>
            </LinkItem>
          </LinksSection>
          <LinksSection>
            <LinkItem>
              <Link href="/">
                <a>近くのレストラン</a>
              </Link>
            </LinkItem>
            <LinkItem>
              <Link href="/">
                <a>すべての都市を表示</a>
              </Link>
            </LinkItem>
            <LinkItem>
              <Link href="/">
                <a>すべての国を見る</a>
              </Link>
            </LinkItem>
            <LinkItem>
              <Link href="/">
                <a>ブログを読む</a>
              </Link>
            </LinkItem>
            <LinkItem>
              <Link href="/">
                <a>Uber Eats について</a>
              </Link>
            </LinkItem>
            <LinkItem>
              <Link href="/">
                <a>
                  <FiGlobe />
                  日本語
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
            <a>
              <FiFacebook size={18} color="#fff" />
            </a>
          </Link>
          <Link href="/">
            <a>
              <FiTwitter size={18} color="#fff" />
            </a>
          </Link>
          <Link href="/">
            <a>
              <FiInstagram size={18} color="#fff" />
            </a>
          </Link>
        </SocialLinks>
      </FooterBottom>
    </Container>
  );
}
