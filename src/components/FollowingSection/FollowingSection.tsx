import useSWR from 'swr';

import VideoWrapper from '../VideoWrapper';
import { get, FOLLOWING_LIST_URL } from '@/apis';
import { List } from '@/types/list';
import VideoPlayer from '@/elements/VideoPlayer';

const mockData = {
  items: [
    {
      title: 'Audi_A4_S4',
      cover:
        'https://i.pinimg.com/1200x/b2/14/e9/b214e93f2466a6f5019e02c82725bbfc.jpg',
      play_url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    },
    {
      title: 'Bugatti_Chiron',
      cover:
        'https://i.pinimg.com/1200x/b2/14/e9/b214e93f2466a6f5019e02c82725bbfc.jpg',
      play_url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    },
    {
      title: 'Range_Rover_Sport_L322',
      cover:
        'https://i.pinimg.com/1200x/b2/14/e9/b214e93f2466a6f5019e02c82725bbfc.jpg',
      play_url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    },
  ],
};

const FollowingSection = () => {
  // const { data, isLoading } = useSWR<List>(FOLLOWING_LIST_URL, get);
  const isLoading = false;
  const data = mockData;

  return <VideoPlayer src={data.items[0].play_url} />;

  // @TODO: handle error

  return <VideoWrapper isLoading={!data && isLoading} data={data?.items} />;
};

export default FollowingSection;
