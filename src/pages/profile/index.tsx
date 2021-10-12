import { GetServerSideProps, NextPage } from 'next';
import { withSSRAuth } from '../../utils/withSSRAuth';

import { ProfileSideNavbar } from '../../components/ProfileSideNavbar';

import { Container, Content, HomeDashboard } from '../../styles/profile';
import { setupAPIClient } from '../../services/api';

interface UserData {
  userData: {
    full_name: string;
    email: string;
  };
}

const Profile: NextPage<UserData> = ({ userData }) => {
  return (
    <Container>
      <ProfileSideNavbar current="home" />
      <Content>
        <h1>Home</h1>
        <HomeDashboard>
          <p>Name: {userData.full_name}</p>
          <p>Email: {userData.email}</p>
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
