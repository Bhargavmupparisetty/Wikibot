const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const notesDirectory = path.join(__dirname, 'notes');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ensure the notes directory exists
if (!fs.existsSync(notesDirectory)) {
  fs.mkdirSync(notesDirectory);
}

app.post('/submit-notes', (req, res) => {
  const { notes } = req.body;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const noteFilePath = path.join(notesDirectory, `note-${timestamp}.txt`);

  fs.writeFile(noteFilePath, notes, (err) => {
    if (err) {
      console.error('Error writing note to file:', err);
      return res.status(500).json({ error: 'Failed to save note' });
    }
    res.status(200).json({ message: 'Note saved successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
