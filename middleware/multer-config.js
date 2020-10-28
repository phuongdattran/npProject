const multer = require('multer');

const MIME_TYPES = {
  'application/octet-stream': 'gpx'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/gpx/');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name.split('.')[0] + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('gps');