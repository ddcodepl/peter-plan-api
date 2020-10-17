import { Router } from 'express'
import { fileUpload } from '../helpers/Utils'
import { catchAsync } from '../middlewares/errors'
import ExampleController from '../controllers/ExampleController'

const upload = fileUpload(`images/teams/logos`)

export default () => {
    const api = Router()

    api.get('/', catchAsync(ExampleController.findAll))
    api.post('/', upload.single('image_file'), catchAsync(ExampleController.create))

    api.get('/:slug', catchAsync(ExampleController.findOneById))
    api.put('/:slug', upload.single('image_file'), catchAsync(ExampleController.update))
    api.delete('/:slug', catchAsync(ExampleController.remove))

    return api
}
