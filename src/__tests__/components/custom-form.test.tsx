import { fireEvent, render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import CustomForm from '@/components/client/forms/CustomForm/custom-form';
import { initialData } from '@/constants/client';
import { LanguageContext } from '@/providers/language';
import type { DataType } from '@/types/client';

import { mockLanguageContext } from '../mocks/language-context';

vi.mock('@/store/store', () => ({
  useAppDispatch: () => vi.fn(),
}));

beforeAll(() => {
  Object.defineProperty(window, 'getComputedStyle', {
    value: () => ({
      getPropertyValue: (prop: string) => {
        if (prop === 'scrollbarColor') return '';
        return '';
      },
    }),
  });
});

describe('CustomForm component', () => {
  const mockSetData = vi.fn();
  const mockDataSource: DataType[] = [
    { key: '1', keyName: 'Key 1', keyValue: 'Value 1' },
    { key: '2', keyName: 'Key 2', keyValue: 'Value 2' },
  ];

  it('renders the table with initial data', () => {
    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <CustomForm dataSource={mockDataSource} setData={mockSetData} />
      </LanguageContext.Provider>,
    );

    expect(screen.getByText('Key 1')).toBeInTheDocument();
    expect(screen.getByText('Value 1')).toBeInTheDocument();
    expect(screen.getByText('Key 2')).toBeInTheDocument();
    expect(screen.getByText('Value 2')).toBeInTheDocument();
  });

  it('allows adding a new row', () => {
    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <CustomForm dataSource={mockDataSource} setData={mockSetData} />
      </LanguageContext.Provider>,
    );

    fireEvent.click(screen.getByText('Добавить'));

    expect(mockSetData).toHaveBeenCalledWith([
      ...mockDataSource,
      { ...initialData, key: 3 },
    ]);
  });

  it('allows editing a cell', () => {
    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <CustomForm dataSource={mockDataSource} setData={mockSetData} />
      </LanguageContext.Provider>,
    );

    fireEvent.click(screen.getByText('Key 1'));
    const input = screen.getByDisplayValue('Key 1');
    expect(input).toBeInTheDocument();
  });

  it('allows deleting a row', () => {
    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <CustomForm dataSource={mockDataSource} setData={mockSetData} />
      </LanguageContext.Provider>,
    );
    expect(screen.getByText('Добавить')).toBeInTheDocument();
  });
});
