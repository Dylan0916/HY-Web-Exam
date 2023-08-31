import { useCallback } from 'react';

import useGlobalStore, { stateSelector } from '@/store/globalStore';

const useMute = () => {
  const { shouldMute, setShouldMute } = useGlobalStore(stateSelector);

  const closeMute = useCallback(() => {
    if (shouldMute) {
      setShouldMute(false);
    }
  }, [shouldMute, setShouldMute]);

  return { closeMute };
};

export default useMute;
