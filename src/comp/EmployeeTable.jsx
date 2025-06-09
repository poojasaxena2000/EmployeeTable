// import React, { useEffect, useState } from 'react';

// const EmployeeTable = () => {
//   const [employees, setEmployees] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [error, setError] = useState(null);

//   const rowsPerPage = 10;

//   // Fetch data from API
//   useEffect(() => {
//     fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         return res.json();
//       })
//       .then((data) => setEmployees(data))
//       .catch((err) => {
//         setError(err.message);
//         alert('failed to fetch data');
//       });
//   }, []);

//   // Pagination calculations
//   const totalPages = Math.ceil(employees.length / rowsPerPage);
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const currentEmployees = employees.slice(startIndex, startIndex + rowsPerPage);

//   // Navigation handlers
//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prev) => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prev) => prev - 1);
//     }
//   };

//   return (
//     <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
//       <h2 style={{ textAlign: 'center' }}>Employee Data Table</h2>
//       <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead style={{ backgroundColor: '#008971', color: 'white' }}>
//           <tr>
//             <th style={thStyle}>ID</th>
//             <th style={thStyle}>Name</th>
//             <th style={thStyle}>Email</th>
//             <th style={thStyle}>Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentEmployees.map((emp) => (
//             <tr key={emp.id}>
//               <td style={tdStyle}>{emp.id}</td>
//               <td style={tdStyle}>{emp.name}</td>
//               <td style={tdStyle}>{emp.email}</td>
//               <td style={tdStyle}>{emp.role}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div style={{ marginTop: '20px', textAlign: 'center' }}>
//         <button onClick={handlePrevious} disabled={currentPage === 1} style={btnStyle}>
//           Previous
//         </button>
//         <span style={{ margin: '0 10px' }}>{currentPage}</span>
//         <button onClick={handleNext} disabled={currentPage === totalPages} style={btnStyle}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// // Styling
// const thStyle = {
//   padding: '10px',
//   border: '1px solid #ddd',
//   textAlign: 'left',
// };

// const tdStyle = {
//   padding: '10px',
//   borderBottom: '1px solid #ddd',
// };

// const btnStyle = {
//   padding: '8px 16px',
//   margin: '0 5px',
//   backgroundColor: '#008971',
//   color: 'white',
//   border: 'none',
//   borderRadius: '4px',
//   cursor: 'pointer',
// };

// export default EmployeeTable;








import React, { useEffect, useState } from 'react';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const rowsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        return res.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(() => {
        setError('failed to fetch data');
        alert('failed to fetch data');
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(employees.length / rowsPerPage);
  const currentEmployees = employees.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2 style={{ textAlign: 'center' }}>Employee Data Table</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#008971', color: 'white' }}>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((emp) => (
            <tr key={emp.id}>
              <td style={tdStyle}>{emp.id}</td>
              <td style={tdStyle}>{emp.name}</td>
              <td style={tdStyle}>{emp.email}</td>
              <td style={tdStyle}>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          style={{
            ...btnStyle,
            opacity: currentPage === 1 ? 0.5 : 1,
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
          data-testid="prev-btn"
        >
          Previous
        </button>

        <span data-testid="current-page" style={{ margin: '0 10px', fontWeight: 'bold' }}>
          {currentPage}
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={{
            ...btnStyle,
            opacity: currentPage === totalPages ? 0.5 : 1,
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          }}
          data-testid="next-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Styles
const thStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  textAlign: 'left',
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
};

const btnStyle = {
  padding: '8px 16px',
  margin: '0 5px',
  backgroundColor: '#008971',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
};

export default EmployeeTable;
