'use strict'

/**
 * Generic controller
 * @author Jeferson Passos
 *
 * @class Controller
 */
class Controller {
  //
  /**
     *  Return registers
     *  Pagination register
     *  Default: page 1 and 20 registers
     *
     * @returns
    //  * @memberof Controller
     */
  async index ({ request }) {
    const { page, limit } = await request.get()

    if (!page) { return this.model.query().paginate(1, parseInt(limit, 10)) }

    return this.model.query().paginate(page, parseInt(limit, 1))
  }

  /**
     * Find one register by id
     *
     * @param {*} { params }
     * @returns
     * @memberof Controller
     */
  async show ({ params }) {
    const values = await this.model.find(params.id)


    if (this.model.schema.relationships !== undefined &&
            this.model.schema.relationships.length > 0) {
      await values.loadMany(this.model.schema.relationships)
    }

    return values
  }

  /**
     * Create register
     *
     * @param {*} { request }
     * @returns
     * @memberof Controller
     */
  async store ({ request }) {
    const data = await request.only(this.model.schema.attributes)

    const values = await this.model.create(data)
    return values
  }

  /**
     * Update register by id
     *
     * @param {*} { request, params }
     * @returns
     * @memberof Controller
     */
  async update ({ request, params }) {
    const data = await request.only(this.model.schema.attributes)

    const currentData = await this.model.find(params.id)
    await currentData.merge(data)
    await currentData.save()

    return currentData
  }

  /**
     * Delete register by id
     *
     * @param {*} { params }
     * @returns
     * @memberof Controller
     */
  async destroy ({ params }) {
    const values = await this.model.find(params.id)

    const deleted = await values.delete()

    return { deleted }
  }
}

module.exports = Controller
