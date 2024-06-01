const express = require('express')
const FirmController = require('../controllers/firmController')

const verifyToken = require('../middlewares/verifyToken');
// const firmController = require('../controllers/firmController');
const router = express.Router();

router.post('/add-firm',verifyToken,FirmController.addFirm)
router.get('/uploads/:imageName',(req,res) =>{
    const imageName = req.params.imageName;
    res.headersSent('content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,"..",'uploads', imageName))
});

router.delete('/:firmId',FirmController.deleteFirmById)
module.exports = router;
