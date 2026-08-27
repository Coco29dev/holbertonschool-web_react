import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';

const courses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
  { id: 4, name: 'TypeScript', credit: 30 },
  { id: 5, name: 'Testing', credit: 50 },
];

describe('CourseList', () => {
  test('renders 5 rows when given an array of 5 courses', () => {
    const { container } = render(<CourseList courses={courses} />);
    expect(container.querySelectorAll('tbody tr')).toHaveLength(5);
  });

  test('renders 1 row when given an empty array', () => {
    const { container } = render(<CourseList courses={[]} />);
    expect(container.querySelectorAll('tbody tr')).toHaveLength(1);
    expect(screen.getByText(/no course available yet/i)).toBeInTheDocument();
  });
});
