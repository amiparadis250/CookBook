'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ingredients', [
      {
        id: 'b9d6f1ec-d5d2-4d4e-9c36-1d58f0fbe80d', 
        name: 'Salt',
        slug: 'salt',
        description: 'A common seasoning used to enhance flavor.',
        foodGroup: 'Seasoning',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 'e7a8a6a2-7fc2-4a0e-95a1-54e2ff1c39e2', 
        name: 'Sugar',
        slug: 'sugar',
        description: 'A sweet substance used in cooking and baking.',
        foodGroup: 'Sweetener',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '1d7a0e4b-78b8-4f3a-9f3a-1d4a6e95b7e5', 
        name: 'Olive Oil',
        slug: 'olive-oil',
        description: 'A healthy oil used for cooking and dressings.',
        foodGroup: 'Fat',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ingredients', null, {});
  },
};
