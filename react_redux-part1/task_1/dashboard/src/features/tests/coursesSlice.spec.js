import mockAxios from 'jest-mock-axios';
import coursesReducer, { fetchCourses } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';

describe('coursesSlice', () => {
  const initialState = { courses: [] };
  const courses = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
  ];

  afterEach(() => {
    mockAxios.reset();
  });

  it('should return the initial state by default', () => {
    expect(coursesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should fetch courses correctly', async () => {
    const promise = fetchCourses()(() => {}, () => ({}), undefined);
    mockAxios.mockResponse({ data: { courses } });
    const result = await promise;
    expect(result.type).toBe('courses/fetchCourses/fulfilled');
    expect(result.payload).toEqual(courses);
    expect(coursesReducer(initialState, result).courses).toEqual(courses);
  });

  it('should reset courses on logout', () => {
    expect(coursesReducer({ courses }, logout())).toEqual(initialState);
  });
});
