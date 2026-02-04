const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json');
const LOGS_FILE = path.join(__dirname, 'logs.csv');

// Helper to read users
const readUsers = () => {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Helper to write users
const writeUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Helper to log attempts
const logActivity = (email, status) => {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp},${email},${status}\n`;
    fs.appendFileSync(LOG_FILE, logEntry);
};
// Correction: the variable name was LOGS_FILE not LOG_FILE
const logActivityCorrected = (email, status) => {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp},${email},${status}\n`;
    fs.appendFileSync(LOGS_FILE, logEntry);
};

// Signup Endpoint
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const users = readUsers();
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: Date.now(),
            name,
            email,
            password: hashedPassword
        };
        users.push(newUser);
        writeUsers(users);
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating user' });
    }
});

// Signin Endpoint
app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const users = readUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
        logActivityCorrected(email, 'failed');
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            logActivityCorrected(email, 'success');
            res.json({
                message: 'Login successful',
                user: { id: user.id, name: user.name, email: user.email }
            });
        } else {
            logActivityCorrected(email, 'failed');
            res.status(400).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error signing in' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
