import { act, render } from '@testing-library/react';
import { useEffect, useState } from 'react';
import type JSX from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useHistoryLS } from '@/hooks/useHistoryLS';

vi.mock('@/config/firebase-config', () => {
  return {
    auth: {
      onAuthStateChanged: vi.fn((callback) => {
        callback({ uid: 'test' });
        return () => {};
      }),
    },
  };
});

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

type Data = {
  date: string;
  method: string;
  url: string;
  encodedURL: string;
};

const TestComponent = (): JSX.Element => {
  const { requests, addRequestToLS } = useHistoryLS();
  const [stateRequests, setStateRequests] = useState<Data[] | null>(null);

  useEffect(() => {
    setStateRequests(requests);
  }, [requests]);

  return (
    <div>
      <button
        onClick={() => addRequestToLS('GET', 'https://test.com', 'encodedURL')}
      >
        Add Request
      </button>
      <div data-testid="requests">
        {stateRequests?.map((req, index) => (
          <div key={index}>
            <span>{req.method}</span>
            <span>{req.url}</span>
            <span>{req.encodedURL}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

describe('useHistoryLS', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initialize requests as empty array', () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    const { getByTestId } = render(<TestComponent />);

    expect(getByTestId('requests').children).toHaveLength(0);
  });

  it('add to localStorage', () => {
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify([]));

    const { getByText } = render(<TestComponent />);

    act(() => {
      getByText('Add Request').click();
    });

    expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(1);

    const [key, value] = mockLocalStorage.setItem.mock.calls[0];

    expect(key).toBe('reqHist-test');

    const savedData = JSON.parse(value);

    expect(savedData).toHaveLength(1);
    expect(savedData[0]).toEqual({
      method: 'GET',
      date: expect.any(String),
      url: 'https://test.com',
      encodedURL: 'encodedURL',
    });

    expect(typeof savedData[0].date).toBe('string');
  });
});
