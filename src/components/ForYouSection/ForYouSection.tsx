import useSWR from 'swr';

import { get, FOR_YOU_LIST_URL } from '@/apis';
import { List } from '@/types/list';
import VideoWrapper from '../VideoWrapper';

const mockData = {
  items: [
    {
      title: 'Rolls_Royce_Ghost',
      cover:
        'https://i.pinimg.com/1200x/b2/14/e9/b214e93f2466a6f5019e02c82725bbfc.jpg',
      play_url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    },
    {
      title: 'Toyota_Camry_XV70',
      cover:
        'https://i.pinimg.com/1200x/b2/14/e9/b214e93f2466a6f5019e02c82725bbfc.jpg',
      play_url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    },
    {
      title: 'Volkswagen_Golf_7',
      cover:
        'https://i.pinimg.com/1200x/b2/14/e9/b214e93f2466a6f5019e02c82725bbfc.jpg',
      play_url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    },
  ],
};

const ForYouSection = () => {
  // const { data, isLoading } = useSWR<List>(FOR_YOU_LIST_URL, get);
  const isLoading = false;
  const data = mockData;

  // @TODO: handle error

  return <VideoWrapper isLoading={!data && isLoading} data={data?.items} />;
};

export default ForYouSection;
