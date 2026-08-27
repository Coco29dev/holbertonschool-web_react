import { render, screen } from '@testing-library/react';
import CourseListRow from './CourseListRow';

describe('CourseListRow', () => {
  describe('when isHeader is true', () => {
    test('renders one columnheader with colspan 2 when textSecondCell is null', () => {
      render(
        <table>
          <tbody>
            <CourseListRow isHeader textFirstCell="Available courses" />
          </tbody>
        </table>
      );

      const headers = screen.getAllByRole('columnheader');
      expect(headers).toHaveLength(1);
      expect(headers[0]).toHaveAttribute('colspan', '2');
    });

    test('renders 2 th cells when textSecondCell is not null', () => {
      render(
        <table>
          <tbody>
            <CourseListRow
              isHeader
              textFirstCell="Course name"
              textSecondCell="Credit"
            />
          </tbody>
        </table>
      );

      expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    });
  });

  describe('when isHeader is false', () => {
    test('renders two td elements within a tr', () => {
      const { container } = render(
        <table>
          <tbody>
            <CourseListRow textFirstCell="ES6" textSecondCell={60} />
          </tbody>
        </table>
      );

      const row = container.querySelector('tr');
      expect(row.querySelectorAll('td')).toHaveLength(2);
    });
  });
});
