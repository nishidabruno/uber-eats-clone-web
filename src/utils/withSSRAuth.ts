import axios from 'axios';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { parseCookies, destroyCookie } from 'nookies';

export function withSSRAuth<T>(fn: GetServerSideProps<T>): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(ctx);

    if (!cookies['uber-eats-clone.token']) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (
        axios.isAxiosError(err) &&
        err.response?.data.message === 'Invalid token.'
      ) {
        destroyCookie(ctx, 'uber-eats-clone.token', { path: '/' });

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }

      return {
        props: {} as T,
      };
    }
  };
}
