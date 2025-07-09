const multer = requie('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'jpg',
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callbaxk(null, 'uploads');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split('').join('_');
        console.log(name)
        const extension = MIME_TYPES[file.mimetype];

        callback(null, Date.now() + name);
    }
});

module.exports = multer({storage: storage});