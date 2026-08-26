import { getCurrentYear, getFooterCopy, getLatestNotification } from './utils';

describe('getCurrentYear', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test('returns the year from the current system date', () => {
    jest.useFakeTimers().setSystemTime(new Date(2025, 5, 15));

    expect(getCurrentYear()).toBe(2025);
  });
});

describe('getFooterCopy', () => {
  test('returns "Holberton School" when isIndex is true', () => {
    expect(getFooterCopy(true)).toBe('Holberton School');
  });

  test('returns "Holberton School main dashboard" when isIndex is false', () => {
    expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
  });
});

describe('getLatestNotification', () => {
  test('returns the urgent requirement notification markup', () => {
    expect(getLatestNotification()).toBe(
      '<strong>Urgent requirement</strong> - complete by EOD'
    );
  });
});
