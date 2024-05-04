const express = require('express');
const multer  = require('multer');
const verifyToken = require('./../middleware/verifyToken');

const storage = multer.diskStorage({
    destination: 'public/uploads/products/',
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '_' + file.originalname)
    }
})
const upload = multer({ storage: storage });
const router = express.Router();
const productController = require('./../controllers/product.controller');


router.use(verifyToken);

router.get('/', productController.list)
        .post('/', upload.single('image'), productController.store)
        .get('/:id', productController.show)
        .put('/:id', upload.single('image'), productController.update)
        .delete('/:id', productController.delete);

module.exports = router;