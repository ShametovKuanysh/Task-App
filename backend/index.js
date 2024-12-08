const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

const PORT = process.env.PORT || '3000';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/users', require('./routes/users'))
app.use('/api/v1/tasks', require('./routes/tasks'))
app.use('/api/v1/comments', require('./routes/comments'))
app.use('/api/v1/attachments', require('./routes/attachments'))

sequelize.sync({force: false})
    .then(() => {
        console.log('Database and tables created successfully.');
    })
    .catch((error) => {
        console.error('Error creating database and tables:', error);
    })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})