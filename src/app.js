const express = require('express');
const { exec } = require('child_process'); // Import for testing vulnerability
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello, Secure World!' });
});

// ❌ VULNERABLE ROUTE FOR TESTING
// Snyk Code will flag this as "Command Injection"
app.get('/network-test', (req, res) => {
  const target = req.query.target;
  // DANGER: Directly concatenating user input into a shell command
  exec(`ping -c 1 ${target}`, (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json({ output: stdout });
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
