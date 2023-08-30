import useSWR from 'swr';

import { get, FOLLOWING_LIST_URL } from '@/apis';
import { List } from '@/types/list';
import VideoWrapper from '../VideoWrapper';

const FollowingSection = () => {
  const { data, isLoading } = useSWR<List>(FOLLOWING_LIST_URL, get);

  // @TODO: handle error

  return <VideoWrapper isLoading={!data && isLoading} data={data?.items} />;
};

export default FollowingSection;
