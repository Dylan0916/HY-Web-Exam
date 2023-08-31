import { renderHook } from '@testing-library/react';

import useGlobalStore from '@/store/globalStore';
import useMute from './useMute';

jest.mock('@/store/globalStore', () =>
  jest.fn().mockRejectedValue({ shouldMute: false, setShouldMute: jest.fn() })
);

describe('useMute', () => {
  const createHook = () => renderHook(useMute);

  const mockSetShouldMute = jest.fn();

  const mockUseGlobalStore = v => {
    (useGlobalStore as unknown as jest.Mock).mockReturnValue(v);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should do nothing if "shouldMute" is false', () => {
    mockUseGlobalStore({ shouldMute: false, setShouldMute: mockSetShouldMute });

    const { result } = createHook();

    result.current.closeMute();

    expect(mockSetShouldMute).not.toBeCalled();
  });

  it('should call setShouldMute with false if "shouldMute" is true', () => {
    mockUseGlobalStore({ shouldMute: true, setShouldMute: mockSetShouldMute });

    const { result } = createHook();

    result.current.closeMute();

    expect(mockSetShouldMute).toBeCalledWith(false);
  });
});
