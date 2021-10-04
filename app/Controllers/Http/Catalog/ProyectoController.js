'use strict'
const Proyecto = use ('App/Models/Proyecto');

class ProyectoController {
  async index({ auth, response }){
    try {
      const user = await auth.getUser();
      return await user.proyectos().fetch();
    }
    catch (error) {
      response.send({mensaje : 'Existe un error al validar el token'})
    }
  }

  async create({ auth, request, response}){
    try {
      const user = await auth.getUser();
      const {
        nombre
      } = request.all();

      const proyecto = new Proyecto();
      proyecto.fill({
        nombre
      });
      await user.proyectos().save(proyecto);
      return response.send(proyecto);
    }
    catch (error) {
      response.send({mensaje : 'Existe un error al validar el token'})
    }
  }
}

module.exports = ProyectoController
