// File: backend/seeders/20250222121000-seed-parts.js
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Parts", [
      {
        name: "Samsung 970 EVO 1TB",
        price: 149.99,
        category: "Storage",
        imageUrl: "/images/images.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "NVIDIA RTX 3080",
        price: 699.99,
        category: "Graphics Cards",
        imageUrl: "/images/download.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Intel Core i9",
        price: 499.99,
        category: "Processors",
        imageUrl: "/images/download (1).jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Corsair Vengeance 16GB",
        price: 89.99,
        category: "Memory",
        imageUrl: "/images/download.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Samsung 970 EVO 2TB",
        price: 249.99,
        category: "Storage",
        imageUrl: "/images/download.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Samsung 970 EVO 500GB",
        price: 109.99,
        category: "Storage",
        imageUrl: "/images/download.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Parts", null, {});
  },
};
