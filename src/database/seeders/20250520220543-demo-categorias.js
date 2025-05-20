'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categorias', [
      { nombre: 'Acción', created_at: new Date(), updated_at: new Date() },
      { nombre: 'Comedia', created_at: new Date(), updated_at: new Date() },
      { nombre: 'Drama', created_at: new Date(), updated_at: new Date() },
      { nombre: 'Terror', created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categorias', null, {});
  }
};