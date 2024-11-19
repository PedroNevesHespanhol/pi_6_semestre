import { existsSync, mkdirSync } from 'fs'
import multer from 'multer'
import { ExtendedRequest } from '../types/extended-request'

function checkFolderExistOrCreate (folder) {
  try {
    if (!existsSync(folder)) {
      mkdirSync(folder, { recursive: true })
    }
  } catch (error) {
    throw new Error(error)
  }
}

const storage = multer.diskStorage({
  destination: function (req: ExtendedRequest, file, cb) {
    const dest = 'uploads'
    const path = dest
    checkFolderExistOrCreate(path)
    cb(null, path)
  },
  filename: function (req: ExtendedRequest, file, cb) {
    const dest = 'uploads'
    const path = dest
    const fileName = file.originalname
    const fileExtension = fileName.substring(fileName.lastIndexOf('.'))
    const fileNameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'))
    let newFileName = `${req.userSlug}_${fileNameWithoutExt}_1${fileExtension}`
    let i = 1
    while (existsSync(`${path}/${newFileName}`)) {
      newFileName = `${req.userSlug}_${fileNameWithoutExt}_${i}${fileExtension}`
      i++
    }
    file.filename = newFileName
    cb(null, newFileName)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png']
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file), false)
  }
  cb(null, true)
}

const upload = multer({
  storage,
  fileFilter
})

const uploadMulter = (req, res, next) => {
  upload.single('file')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      const file = 'file'
      if (req[file] === undefined) {
        res.status(404).json({ message: 'Type or Size file is not supported' })
      }
    } else if (err) {
      res.status(500).json({ message: 'An unknown error occurred when uploading.' })
    } else {
      next()
    }
  })
}

export { uploadMulter }
