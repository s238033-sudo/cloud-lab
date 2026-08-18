const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Student = require('./models/student');

const app = express();

app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Kết nối MongoDB Atlas thành công!'))
  .catch((err) => console.error('Lỗi kết nối MongoDB:', err));


app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Câu 37: API POST /api/students - Thêm sinh viên mới

app.post('/api/students', async (req, res) => {
  try {
    const { studentId, name, email } = req.body;
    const newStudent = await Student.create({ studentId, name, email });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Câu 38: API PUT /api/students/:id - Cập nhật sinh viên

app.put('/api/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Câu 39: API DELETE /api/students/:id - Xóa sinh viên

app.delete('/api/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xóa sinh viên thành công!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại port ${PORT}`);
});