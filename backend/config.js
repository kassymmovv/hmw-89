const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public', 'uploads'),
  database: 'mongodb://localhost/radio',
  databaseOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  facebook: {
    appId: '917854481986603',
    appSecret: 'd26f321947a5497416e31a268f5e51e5'
  }
};