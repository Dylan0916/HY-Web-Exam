import { FC } from 'react';
import useSWR from 'swr';

import VideoWrapper from '../VideoWrapper';

import { get, FOLLOWING_LIST_URL } from '@/apis';
import { List } from '@/types/list';

interface Props {
  isHorizontalActive: boolean;
}

const FollowingSection: FC<Props> = ({ isHorizontalActive }) => {
  const { data, isLoading } = useSWR<List>(FOLLOWING_LIST_URL, get);

  // @TODO: handle error

  return (
    <VideoWrapper
      isHorizontalActive={isHorizontalActive}
      isLoading={!data && isLoading}
      data={data?.items}
    />
  );
};

export default FollowingSection;
