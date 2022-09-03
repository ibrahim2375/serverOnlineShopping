const express = require('express');
const router = express.Router();
const { getFileStream } = require('../../S3');
router.get('/:key', (req, res) => {
    const readStream = getFileStream(req.params.key);
    readStream.pipe(res);

});
module.exports = router;