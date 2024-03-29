require('dotenv').config();
const express = require('express');
const eventRoutes = require('./routes/fireEventRoutes');
const cors = require('cors');
const earthquakeRoutes = require('./routes/earthquakeEventRoutes');
const weatherRoutes = require('./routes/weatherEventRoutes');
const firmRoutes = require('./routes/firmEventRoutes');
const eventPixlesRoutes = require('./routes/eventPixelsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api', eventRoutes);
app.use('/api', earthquakeRoutes);
app.use('/api', weatherRoutes);
app.use('/api',firmRoutes)
app.use('/api', eventPixlesRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;