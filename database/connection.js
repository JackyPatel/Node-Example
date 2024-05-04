const { Sequelize } = require('sequelize');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME, DB_CONNECTION_TYPE } = process.env;
const databaseConnection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_CONNECTION_TYPE/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

databaseConnection.authenticate()
                .then(() => {
                    console.log(`Database connction established successfully.`)
                })
                .catch((err) => {
                    console.log(err.message);
                    process.exit(1);
                });

module.exports = databaseConnection;