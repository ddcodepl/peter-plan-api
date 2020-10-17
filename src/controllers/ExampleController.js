import Example from '../models/Example'

export default {
    async findAll(req, res, next) {
        const data = await Example.find({})
            .sort({ updatedAt: 'desc' })
            .populate('author', 'name')

        return res.status(200).send(data)
    },

    async findOneById(req, res, next) {
        const { slug } = req.params

        const data = await Example.findOne({ slug })
        if (!data) next()

        res.status(200).send(data)
    },

    async create(req, res, next) {
        if (!req.file) {
            return res.status(200).send({ msg: `Image required` })
        }

        const { body } = req
        body.image = `${process.env.BASE_URL}/images/${req.file.filename}`

        const data = await new Example(body).save()

        return res.status(201).send({ data, msg: `News created` })
    },

    async update(req, res, next) {
        const { body } = req

        const item = await Example.findOne({ slug: body.slug })

        body.image = req.file ? `${process.env.BASE_URL}/images/news/featured/${req.file.filename}` : item.image

        const data = Object.assign(item, body)
        data.save()

        return res.status(200).send({ data: req.body, msg: `News updated` })
    },

    async remove(req, res, next) {
        const { slug } = req.params

        await Example.deleteOne({ slug })
        const data = await Example.find()

        return res.status(200).send({ data, msg: `News removed removed` })
    },

    async publish(req, res, next) {
        const { slug } = req.params

        const data = await Example.findOne({ slug })

        data.is_public = !data.is_public
        data.save()

        if (data.is_public) {
            return res.status(200).send({ data, msg: `News published` })
        }

        return res.status(200).send({ data, msg: `News hidden` })
    },
}
