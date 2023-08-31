import { RefObject } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useGlobalStore from '@/store/globalStore';
import UnmuteButton from './UnmuteButton';

jest.mock('@/store/globalStore', () => jest.fn());

describe('UnmuteButton', () => {
  const defaultProps = {
    playerRef: { current: {} } as RefObject<HTMLVideoElement>,
  };

  const mockSetShouldMute = jest.fn();

  const createRenderer = (testProps = {}) => {
    return render(<UnmuteButton {...defaultProps} {...testProps} />);
  };

  const mockUseGlobalStore = v => {
    (useGlobalStore as unknown as jest.Mock).mockReturnValue(v);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should do nothing if "muted" is false when the button is clicked', async () => {
    mockUseGlobalStore(mockSetShouldMute);

    const { getByText } = createRenderer({
      playerRef: { current: { muted: false } },
    });

    await userEvent.click(getByText('Unmute'));

    expect(mockSetShouldMute).not.toBeCalled();
  });

  it('should call setShouldMute with false if "muted" is true when the button is clicked', async () => {
    mockUseGlobalStore(mockSetShouldMute);

    const { getByText } = createRenderer({
      playerRef: { current: { muted: true } },
    });

    await userEvent.click(getByText('Unmute'));

    expect(mockSetShouldMute).toBeCalledWith(false);
  });
});
