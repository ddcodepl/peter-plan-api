import path from 'path'
import multer from 'multer'

/**
 *
 * Select destination of the file and maximum file size.
 * Default file size is 1MB
 *
 * @param {String} dest
 * @param {Integer} fileSize
 */
export const fileUpload = (dest, fileSize = 1 * 1024 * 1000) => {
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, dest)
        },
        filename(req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname))
        },
    })

    const upload = multer({
        limits: { fileSize },
        storage,
    })

    return upload
}
