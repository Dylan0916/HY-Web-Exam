import useSWR from 'swr';

import { get, FOR_YOU_LIST_URL } from '@/apis';
import { List } from '@/types/list';
import VideoWrapper from '../VideoWrapper';

const ForYouSection = () => {
  const { data, isLoading } = useSWR<List>(FOR_YOU_LIST_URL, get);

  // @TODO: handle error

  return <VideoWrapper isLoading={!data && isLoading} data={data?.items} />;
};

export default ForYouSection;
