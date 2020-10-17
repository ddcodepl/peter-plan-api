import { Router } from 'express'
import { catchAsync } from '../middlewares/errors'
import RoomController from '../controllers/RoomController'


export default () => {
    const api = Router()

    api.get('/', catchAsync(RoomController.findAll))
    api.post('/', catchAsync(RoomController.create))

    api.get('/:slug', catchAsync(RoomController.findOneById))
    api.put('/:slug', catchAsync(RoomController.update))
    api.delete('/:slug', catchAsync(RoomController.remove))

    return api
}
