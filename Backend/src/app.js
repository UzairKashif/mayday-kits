require('dotenv').config();
const express = require('express');
const eventRoutes = require('./routes/fireEventRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', eventRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;