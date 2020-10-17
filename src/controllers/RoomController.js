import Room from "../models/Room";

export default {
    async create(req, res) {
        const {body} = req

        const data = await new Room(body).save()

        return res.status(201).send({data, msg: `Room created`})
    },

    async update(req, res) {
        const {body} = req

        const item = await Room.findOne({id: body.id})

        const data = {...item, ...body}
        data.save()

        return res.status(200).send({data, msg: `Room updated`})
    },

    async remove(req, res, next) {
        const {id} = req.params

        await Room.deleteOne({slug})
        const data = await Room.find()

        return res.status(200).send({data, msg: `Room removed`})
    },
}
