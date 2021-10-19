import { GetServerSideProps, NextPage } from 'next';
import { withSSRAuth } from '../../utils/withSSRAuth';

import { ProfileSideNavbar } from '../../components/ProfileSideNavbar';

import { Container, Content, HomeDashboard } from '../../styles/profile';
import { setupAPIClient } from '../../services/api';
import { useTranslator } from '../../hooks/useTranslator';

interface UserData {
  userData: {
    full_name: string;
    email: string;
  };
}

const Profile: NextPage<UserData> = ({ userData }) => {
  const { f } = useTranslator();
  return (
    <Container>
      <ProfileSideNavbar current="home" />
      <Content>
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
