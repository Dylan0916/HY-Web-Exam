import { RefObject } from 'react';
import { useUpdateEffect } from 'react-use';

import useGlobalStore, {
  isProgressBarMovingSelector,
} from '@/store/globalStore';
import { ScrollableRef } from '@/elements/Scrollable';

interface usePreventScrollingArgs {
  scrollableRef: RefObject<ScrollableRef | undefined>;
}

export const usePreventScrolling = ({
  scrollableRef,
}: usePreventScrollingArgs) => {
  const isProgressBarMoving = useGlobalStore(isProgressBarMovingSelector);

  useUpdateEffect(() => {
    if (!scrollableRef.current) return;

    const { target, translate, limit } = scrollableRef.current.internalEngine();

    const preventScrolling = () => {
      if (!scrollableRef.current) return;

      const isFirst =
        !scrollableRef.current.canScrollPrev() &&
        scrollableRef.current.canScrollNext();
      const isLast =
        !scrollableRef.current.canScrollNext() &&
        scrollableRef.current.canScrollPrev();
      const selectedIndex = scrollableRef.current.selectedScrollSnap();

      if (isFirst) {
        target.set(limit.max);
      } else if (isLast) {
        target.set(limit.min);
      } else {
        target.set(-window.innerHeight * selectedIndex);
      }

      translate.toggleActive(false);
    };

    if (isProgressBarMoving) {
      scrollableRef.current.on('scroll', preventScrolling);
    } else {
      translate.toggleActive(true);
      scrollableRef.current.off('scroll', preventScrolling);
    }

    return () => {
      if (scrollableRef.current) {
        translate.toggleActive(true);
        scrollableRef.current.off('scroll', preventScrolling);
      }
    };
  }, [isProgressBarMoving]);
};
