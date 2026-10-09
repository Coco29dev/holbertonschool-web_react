import CourseListRow from './CourseListRow';

function CourseList({ courses = [] }) {
  return (
    <div className="w-4/5 mx-auto my-8 overflow-x-auto max-[912px]:w-full max-[520px]:text-sm">
      <table id="CourseList" className="w-full border-collapse">
        <thead>
          <CourseListRow isHeader textFirstCell="Available courses" />
          <CourseListRow isHeader textFirstCell="Course name" textSecondCell="Credit" />
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <CourseListRow isHeader textFirstCell="No course available yet" />
          ) : (
            courses.map((course) => (
              <CourseListRow
                key={course.id}
                textFirstCell={course.name}
                textSecondCell={course.credit}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;
