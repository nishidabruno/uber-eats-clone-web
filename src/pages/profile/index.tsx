import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import { AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { ProfileSideNavbar } from '../../components/ProfileSideNavbar';
import { setupAPIClient } from '../../services/api';
import { useTranslator } from '../../hooks/useTranslator';
import { useWindowDimension } from '../../hooks/contexts/WindowDimensionContext';
import { useProfileSideNavBar } from '../../hooks/contexts/ProfileSideNavDrawer';
import { ProfileSideNavbarDrawer } from '../../components/ProfileSideNavbarDrawer';

import {
  Container,
  Content,
  HomeDashboard,
  DrawerContainer,
} from '../../styles/profile';

interface UserData {
  userData: {
    full_name: string;
    email: string;
  };
}

const Profile: NextPage<UserData> = ({ userData }) => {
  const { windowDimension } = useWindowDimension();
  const { isOpen, setIsOpen } = useProfileSideNavBar();
  const { f } = useTranslator();
  return (
    <Container>
      <Head>
        <title>Uber eats | Profile</title>
      </Head>
      {windowDimension > 768 ? (
        <ProfileSideNavbar current="home" />
      ) : (
        <AnimatePresence>
          {isOpen && <ProfileSideNavbarDrawer current="home" />}
        </AnimatePresence>
      )}
      <Content>
        {windowDimension <= 768 && (
          <DrawerContainer onClick={() => setIsOpen(prev => !prev)}>
            <FiMenu size={24} />
          </DrawerContainer>
        )}
        <h1>{f('PROFILE_HOME_SUBTITLE')}</h1>
        <HomeDashboard>
          <p>
            {f('PROFILE_HOME_NAME')} {userData.full_name}
          </p>
          <p>
            {f('PROFILE_HOME_EMAIL')} {userData.email}
          </p>
        </HomeDashboard>
      </Content>
    </Container>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get('/users/me');

  return {
    props: {
      userData: data,
    },
  };
});
