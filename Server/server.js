const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let currentSetpoint = null;

//Endpoint to  test if the server is still running
app.get('/', (req, res) =>{
   res.status(200).json('OK');
})

// Endpoint to receive the setpoint from the frontend
app.post('/api/setpoint', (req, res) => {
  console.log('Received request body:', req.body);
  const { value } = req.body;

  if (value === undefined) {
    return res.status(400).json({ message: 'Value is required' });
  }

  try {
    currentSetpoint = value;
    console.log('Setpoint updated to:', currentSetpoint);
    res.status(200).json({ message: 'Setpoint updated successfully', setpoint: currentSetpoint });
  } catch (error) {
    console.error('Error updating setpoint:', error);
    res.status(500).json({ message: 'Error updating setpoint', error: error.message });
  }
});

// Endpoint to get the current setpoint for the ESP32
app.get('/api/getpoint', (req, res) => {
  if (currentSetpoint === null) {
    console.log('Setpoint request received, but no setpoint is available.');
    return res.status(404).json({ message: 'Setpoint not found' });
  }

  // Log the request details including the time
  console.log(`Setpoint ${currentSetpoint} has been sent to the ESP32 at ${new Date().toLocaleString()}.`);
  
  res.status(200).json({ setpoint: currentSetpoint });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
