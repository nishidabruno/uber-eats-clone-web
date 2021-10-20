import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

export function setupAPIClient(
  ctx: GetServerSidePropsContext | undefined = undefined
) {
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
    headers: {
      Authorization: `Bearer ${cookies['uber-eats-clone.token']}`,
    },
  });

  return api;
}
