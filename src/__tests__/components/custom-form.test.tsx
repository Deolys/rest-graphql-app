import { fireEvent, render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import CustomForm from '@/components/client/forms/custom-form/custom-form';
import { initialData } from '@/constants/client';
import { LanguageContext } from '@/providers/language';
import type { DataType } from '@/types/client';

import { mockLanguageContext } from '../mocks/language-context';

vi.mock('@/store', () => ({
  useAppDispatch: () => vi.fn(),
}));

beforeAll(() => {
  Object.defineProperty(window, 'getComputedStyle', {
    value: () => ({
      getPropertyValue: () => {
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

  it('allows deleting a row', () => {
    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <CustomForm dataSource={mockDataSource} setData={mockSetData} />
      </LanguageContext.Provider>,
    );

    fireEvent.click(screen.getAllByTitle('Удалить заголовок')[0]);

    expect(mockSetData).toHaveBeenCalledWith([
      { key: '2', keyName: 'Key 2', keyValue: 'Value 2' },
    ]);
  });

  it('allows editing a cell', async () => {
    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <CustomForm dataSource={mockDataSource} setData={mockSetData} />
      </LanguageContext.Provider>,
    );

    fireEvent.click(screen.getByText('Key 1'));

    const input = screen.getByDisplayValue('Key 1');
    fireEvent.change(input, { target: { value: 'Updated Key 1' } });
    fireEvent.blur(input);

    await screen.findByDisplayValue('Updated Key 1');

    expect(mockSetData).toHaveBeenCalledWith([
      { key: '1', keyName: 'Updated Key 1', keyValue: 'Value 1' },
      { key: '2', keyName: 'Key 2', keyValue: 'Value 2' },
    ]);
  });

  it('calls setData with correct payload when deleting a row', () => {
    const localMockSetData = vi.fn();
    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <CustomForm dataSource={mockDataSource} setData={localMockSetData} />
      </LanguageContext.Provider>,
    );

    fireEvent.click(screen.getAllByTitle('Удалить заголовок')[0]);

    expect(localMockSetData).toHaveBeenCalledWith([
      { key: '2', keyName: 'Key 2', keyValue: 'Value 2' },
    ]);
  });
});
