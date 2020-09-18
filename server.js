require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const app = express();

connectDB();
// Middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: ['https://game-thing.herokuapp.com/', 'https://game-thing-dev.herokuapp.com/'] }));
app.use(cookieParser(process.env.COOKIE_SECRET));
// Routes
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    // Set Static Folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
