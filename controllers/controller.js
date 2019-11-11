import Utils from './../utils/utils';

class Controller {

    constructor(service) {
        this.service = service;
        this.get = this.get.bind(this);
        this.getAll = this.getAll.bind(this);
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll(req, res, next) {
        try {
            let item = await this.service.getAll(req.query);
            return res.status(200).send(Utils.validateResponse(item));
        } catch (error) {
            next(error);
        }
    }

    async get(req, res, next) {
        try {
            let item = await this.service.get(req.query);
            return res.status(200).send(Utils.validateResponse(item));
        } catch (error) {
            next(error);
        }
    }

    async insert(req, res, next) {
        try {
            let item = await this.service.insert(req.body);
            return res.status(201).send(Utils.validateResponse(item));
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            let item = await this.service.update(id, req.body);
            return res.status(201).send(Utils.validateResponse(item));
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            let item = await this.service.delete(id);
            return res.status(202).send(Utils.validateResponse(item));
        } catch (error) {
            next(error);
        }
    }

}

export default Controller;