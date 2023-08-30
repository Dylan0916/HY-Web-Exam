import useSWR from 'swr';

import VideoWrapper from '../VideoWrapper';
import { get, FOLLOWING_LIST_URL } from '@/apis';
import { mockListData } from '@/apis/mockData';
import { List } from '@/types/list';
import VideoPlayer from '@/elements/VideoPlayer';

const FollowingSection = () => {
  // const { data, isLoading } = useSWR<List>(FOLLOWING_LIST_URL, get);
  const isLoading = false;
  const data = mockListData;

  return <VideoPlayer src={data.items[0].play_url} />;

  // @TODO: handle error

  return <VideoWrapper isLoading={!data && isLoading} data={data?.items} />;
};

export default FollowingSection;
