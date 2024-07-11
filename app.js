const express = require('express');
const { sequelize } = require('./models');
const app = express();
require('dotenv').config();

app.use(express.json());

app.use('/auth', require('./routes/authRoutes'));
app.use('/tasks', require('./routes/taskRoutes'));
app.use('/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter : true }).then(() => {
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });
      });

