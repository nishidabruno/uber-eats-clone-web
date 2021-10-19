import { useIntl } from 'react-intl';
import { en } from '../content/locale';

export const useTranslator = () => {
  const { formatMessage } = useIntl();
  const f = (id: keyof typeof en, number?: number) =>
    formatMessage({ id }, { number });

  return { f };
};
