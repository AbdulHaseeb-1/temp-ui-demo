const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const categoryRoutes = require('./routes/category');
const questionRoutes = require('./routes/question');
const userQuestionsRoutes = require('./routes/userQuestions');
const sliderRoutes = require('./routes/slider');
const bayanRoutes = require('./routes/bayan');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/categories', categoryRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/user-questions', userQuestionsRoutes);
app.use('/api/slider', sliderRoutes);
app.use('/slider', express.static(path.join(__dirname, 'public/slider')));
app.use('/api/bayans', bayanRoutes);
app.use('/api/courses', require('./routes/course'));
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
