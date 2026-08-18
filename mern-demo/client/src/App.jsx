import { useState, useEffect } from 'react';

function App() {
  // ==========================================
  // [CÂU 48]: Khai báo React State cho Form & Danh sách
  // ==========================================
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // ==========================================
  // [CÂU 47]: Dùng fetch() gọi GET /api/students
  // ==========================================
  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sinh viên:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ==========================================
  // [CÂU 49]: Dùng fetch() gửi POST /api/students
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId, name, email }),
      });

      if (response.ok) {
        // Reset form sau khi gửi thành công
        setStudentId('');
        setName('');
        setEmail('');
        // Cập nhật lại danh sách sinh viên hiển thị
        fetchStudents();
      }
    } catch (error) {
      console.error('Lỗi khi tạo sinh viên:', error);
    }
  };

  // Tất cả giao diện HTML/JSX BẮT BUỘC phải nằm trong lệnh return này:
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Quản Lý Sinh Viên</h2>

      {/* [CÂU 48]: Giao diện Form với các thành phần <input> */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <label>MSSV: </label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Họ tên: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Thêm Sinh Viên</button>
      </form>

      {/* [CÂU 47]: Giao diện hiển thị danh sách sinh viên */}
      <h3>Danh Sách Sinh Viên</h3>
      <ul>
        {students.map((student) => (
          <li key={student._id || student.studentId}>
            {student.studentId} - {student.name} - {student.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;