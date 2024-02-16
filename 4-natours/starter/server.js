const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

// const port = process.env.PORT || 3000;

const port = 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
