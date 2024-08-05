module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add columns
    await queryInterface.addColumn('posts', 'title', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('posts', 'content', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
    await queryInterface.addColumn('posts', 'date', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
    await queryInterface.addColumn('posts', 'imageUrl', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove columns
    await queryInterface.removeColumn('posts', 'title');
    await queryInterface.removeColumn('posts', 'content');
    await queryInterface.removeColumn('posts', 'date');
    await queryInterface.removeColumn('posts', 'imageUrl');
  }
};
