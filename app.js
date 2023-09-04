const express = require('express');
const app = express();
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpecs = require('./swagger');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const EmployeeRoute = require('./routes/employees.routes');

const port = 3000;


// Add this middleware to serve Swagger UI
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use('/api/employee', EmployeeRoute);

// mongo db connection
mongoose.connect('mongodb://localhost:27017/Employees', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});

db.once('open', () => {
    console.log('Database connection established!');
});

/**
 * @swagger
 * /api/greet:
 *   get:
 *     summary: Returns a greeting message
 *     responses:
 *       200:
 *         description: A JSON object with a greeting message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello, world!
 */


// const url = 'mongodb://localhost:27017'; // Default MongoDB connection URL
// const dbName = 'Employees'; // Replace with your desired database name

// async function connectToDatabase() {
//   try {
//     const client = await MongoClient.connect(url);
//     console.log('Connected to MongoDB');

//     const db = client.db(dbName);

//     // Your database operations here...

//     client.close();
//     console.log('Disconnected from MongoDB');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// }

// connectToDatabase();
