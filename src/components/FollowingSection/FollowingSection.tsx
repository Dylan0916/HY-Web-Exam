import { FC } from 'react';
import useSWR from 'swr';

import VideoWrapper from '../VideoWrapper';

import { get, FOLLOWING_LIST_URL } from '@/apis';
import { List } from '@/types/list';

interface Props {
  isHorizontalActive: boolean;
}

const FollowingSection: FC<Props> = ({ isHorizontalActive }) => {
  const { data, isLoading, error } = useSWR<List>(FOLLOWING_LIST_URL, get);

  return (
    <VideoWrapper
      isHorizontalActive={isHorizontalActive}
      isLoading={!data && isLoading}
      data={data?.items}
      error={error}
    />
  );
};

export default FollowingSection;
