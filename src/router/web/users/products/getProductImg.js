const express = require('express');
const router = express.Router();
const { getFileStream } = require('../../S3');
router.get('/:key', (req, res) => {
    let Key = req.params.key;
    let readStream = getFileStream(Key);
    readStream.pipe(res);
});
module.exports = router;