const app = require('./app');
require('dotenv').config();
const { PORT = 5001 } = process.env;

app.listen(PORT, () => console.log(`Server is started on ${PORT}`));