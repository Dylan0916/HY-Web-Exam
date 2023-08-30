import { useEffect, useCallback } from 'react';
import PubSub from 'pubsub-js';

export const SCROLL_DIRECTION = 'SCROLL_DIRECTION';

type Topic = typeof SCROLL_DIRECTION;

export const useSubscribe = (
  topic: Topic,
  subscriber: (msg: string, data) => void
) => {
  useEffect(() => {
    const token = PubSub.subscribe(topic, subscriber);

    return () => {
      PubSub.unsubscribe(token);
    };
  }, [topic, subscriber]);
};

export const usePublish = (topic: Topic) => {
  return useCallback(
    data => {
      PubSub.publish(topic, data);
    },
    [topic]
  );
};
