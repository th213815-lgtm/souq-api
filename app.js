require('dotenv').config(); // تحميل متغيرات البيئة في أول سطر تماماً
const express = require('express');
const connectDB = require('./config/db');

// الاتصال بقاعدة البيانات
connectDB();

const app = express();
app.use(express.json());

// المسارات (Routes)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// معالج مسارات 404
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Route Not Found' });
});

// معالج الأخطاء العام (Global Error Handler)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));