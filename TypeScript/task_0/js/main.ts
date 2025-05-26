interface Student {
  firstName: string,
  lastName: string,
  age: number,
  location: string
};

let student1: Student = {
  firstName: "Jojo",
  lastName: "Jiji",
  age: 20,
  location: "Vesoul"
};


let student2: Student = {
  firstName: "Roro",
  lastName: "Riri",
  age: 26,
  location: "Arcachon"
};

let studentsList: Student[] = [student1, student2];

function renderTable(): void {
  // Create table element
  const table: HTMLTableElement = document.createElement('table');

  // Add some basic styling
  table.style.borderCollapse = 'collapse';
  table.style.width = '100%';
  table.style.marginTop = '20px';

  // Create table header
  const thead: HTMLTableSectionElement = document.createElement('thead');
  const headerRow: HTMLTableRowElement = document.createElement('tr');

  const firstNameHeader: HTMLTableCellElement = document.createElement('th');
  firstNameHeader.textContent = 'First Name';
  firstNameHeader.style.border = '1px solid #ddd';
  firstNameHeader.style.padding = '8px';
  firstNameHeader.style.backgroundColor = '#f2f2f2';

  const locationHeader: HTMLTableCellElement = document.createElement('th');
  locationHeader.textContent = 'Location';
  locationHeader.style.border = '1px solid #ddd';
  locationHeader.style.padding = '8px';
  locationHeader.style.backgroundColor = '#f2f2f2';

  headerRow.appendChild(firstNameHeader);
  headerRow.appendChild(locationHeader);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody: HTMLTableSectionElement = document.createElement('tbody');

  // Iterate through students and create rows
  studentsList.forEach((student: Student): void => {
    const row: HTMLTableRowElement = document.createElement('tr');

    const firstNameCell: HTMLTableCellElement = document.createElement('td');
    firstNameCell.textContent = student.firstName;
    firstNameCell.style.border = '1px solid #ddd';
    firstNameCell.style.padding = '8px';

    const locationCell: HTMLTableCellElement = document.createElement('td');
    locationCell.textContent = student.location;
    locationCell.style.border = '1px solid #ddd';
    locationCell.style.padding = '8px';

    row.appendChild(firstNameCell);
    row.appendChild(locationCell);
    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  // Append table to the document body
  document.body.appendChild(table);
}

// Wait for DOM to be loaded before rendering
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderTable);
} else {
  renderTable();
}
