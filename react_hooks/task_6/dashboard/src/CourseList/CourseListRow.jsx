const headerRowClasses = 'bg-table-header/66';
const rowClasses = 'bg-table-rows/45';
const headerCellClasses = 'border border-gray-400 text-center font-bold';
const cellClasses = 'border border-gray-400 pl-2';

function CourseListRow({ isHeader = false, textFirstCell = '', textSecondCell = null }) {
  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr className={headerRowClasses}>
          <th colSpan={2} className={headerCellClasses}>{textFirstCell}</th>
        </tr>
      );
    }

    return (
      <tr className={headerRowClasses}>
        <th className={headerCellClasses}>{textFirstCell}</th>
        <th className={headerCellClasses}>{textSecondCell}</th>
      </tr>
    );
  }

  return (
    <tr className={rowClasses}>
      <td className={cellClasses}>{textFirstCell}</td>
      <td className={cellClasses}>{textSecondCell}</td>
    </tr>
  );
}

export default CourseListRow;
