import { ReactNode, useEffect, useImperativeHandle, forwardRef } from 'react';
import useEmblaCarousel, {
  EmblaOptionsType,
  EmblaEventType,
} from 'embla-carousel-react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  options?: EmblaOptionsType;
  onSelect?: (eventType: EmblaEventType) => void;
}

export type EmblaApi = ReturnType<typeof useEmblaCarousel>[1];
export type ScrollableRef = EmblaApi;

const Scrollable = forwardRef<ScrollableRef, Props>((props, ref) => {
  const { children, options = {}, onSelect } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, speed: 60 });
  const isVertical = options.axis === 'y';

  useImperativeHandle(ref, () => emblaApi, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const preventEdgeScrolling = () => {
      const { limit, target, location, scrollTo } = emblaApi.internalEngine();

      if (limit.reachedMax(target.get())) {
        if (limit.reachedMax(location.get())) location.set(limit.max);
        target.set(limit.max);
        scrollTo.distance(0, false);
      }
      if (limit.reachedMin(target.get())) {
        if (limit.reachedMin(location.get())) location.set(limit.min);
        target.set(limit.min);
        scrollTo.distance(0, false);
      }
    };
    const handleScroll = () => {
      preventEdgeScrolling();
    };

    emblaApi.on('scroll', handleScroll);

    if (onSelect) {
      emblaApi.on('select', onSelect);
    }
  }, [emblaApi, onSelect]);

  return (
    <SEmbla ref={emblaRef}>
      <SEmblaContainer $isVertical={isVertical}>{children}</SEmblaContainer>
    </SEmbla>
  );
});

export default Scrollable;

const SEmbla = styled.div`
  overflow: hidden;
`;
const SEmblaContainer = styled.div<{ $isVertical: boolean }>`
  max-height: 100vh;
  display: flex;
  flex-direction: ${({ $isVertical }) => ($isVertical ? 'column' : 'row')};
`;
