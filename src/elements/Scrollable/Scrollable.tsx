import { ReactNode, useEffect, useImperativeHandle, forwardRef } from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  options?: EmblaOptionsType;
  onSelect?: (e: NonNullable<EmblaApi>) => void;
}

export type EmblaApi = ReturnType<typeof useEmblaCarousel>[1];
export type ScrollableRef = EmblaApi;

const Scrollable = forwardRef<ScrollableRef, Props>((props, ref) => {
  const { children, options = {}, onSelect } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const isVertical = options.axis === 'y';

  useImperativeHandle(ref, () => emblaApi, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const preventEdgeScrolling = () => {
      const {
        limit,
        target,
        location,
        offsetLocation,
        scrollTo,
        translate,
        scrollBody,
      } = emblaApi.internalEngine();

      let edge: number | null = null;

      if (limit.reachedMax(location.get())) {
        edge = limit.max;
      }
      if (limit.reachedMin(location.get())) {
        edge = limit.min;
      }

      if (edge !== null) {
        offsetLocation.set(edge);
        location.set(edge);
        target.set(edge);
        translate.to(edge);
        translate.toggleActive(false);
        scrollBody.useDuration(0).useFriction(0);
        scrollTo.distance(0, false);
      } else {
        translate.toggleActive(true);
      }
    };

    emblaApi.on('scroll', preventEdgeScrolling);

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
