import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterAndSort from '../components/filters/filter-and-sort.component';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('FilterAndSort Component', () => {
  const setFilter = jest.fn();
  const setSort = jest.fn();
  const setTypeFilter = jest.fn();

  beforeEach(() => {
    setFilter.mockClear();
    setSort.mockClear();
    setTypeFilter.mockClear();

    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: 'fire' },
        { id: 2, name: 'water' },
      ],
    });
  });

  it('should render filter and sort options', async () => {
    await act(async () => {
      render(<FilterAndSort setFilter={setFilter} setSort={setSort} setTypeFilter={setTypeFilter} />);
    });

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /All Types/i })).toBeInTheDocument();
  });

  it('should call setFilter when filter option is selected', async () => {
    await act(async () => {
      render(<FilterAndSort setFilter={setFilter} setSort={setSort} setTypeFilter={setTypeFilter} />);
    });

    fireEvent.change(screen.getByDisplayValue('All'), { target: { value: 'api' } });

    expect(setFilter).toHaveBeenCalledWith('api');
  });

  it('should call setSort when sort option is selected', async () => {
    await act(async () => {
      render(<FilterAndSort setFilter={setFilter} setSort={setSort} setTypeFilter={setTypeFilter} />);
    });

    fireEvent.change(screen.getByDisplayValue('Sort by'), { target: { value: 'name-asc' } });

    expect(setSort).toHaveBeenCalledWith('name-asc');
  });

  it('should call setTypeFilter when type option is selected', async () => {
    await act(async () => {
      render(<FilterAndSort setFilter={setFilter} setSort={setSort} setTypeFilter={setTypeFilter} />);
    });

    fireEvent.click(screen.getByRole('button', { name: /All Types/i }));
    fireEvent.click(await screen.findByText('fire'));

    expect(setTypeFilter).toHaveBeenCalledWith('fire');
  });
});
