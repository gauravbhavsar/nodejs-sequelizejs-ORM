var Sequelize = require('sequelize');

var seqlz = new Sequelize('SequelizeDemo', 'sequelizedemouser', 'abcd', {
	host: 'localhost',
	dialect: 'mssql',

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
});

module.exports = {
		//Created Users Schema
		User : function(){
			var data = seqlz.define('Users', {
			firstName: Sequelize.STRING,
			lastName: Sequelize.STRING,
			IsDeleted: {
					type: Sequelize.BOOLEAN,
					allowNull: false
				}
			});
			return data;
		},

		//Created Projects Schema
		Project : function(){
			var data = seqlz.define('Projects', {
				title: Sequelize.STRING,
				description: Sequelize.TEXT,
				IsDeleted:{
						type: Sequelize.BOOLEAN,
						allowNull: false
					}
				});
			return data;
		},

		//Created Tasks Schema
		Task : function(){
			var data = seqlz.define('Tasks', {
				title: Sequelize.STRING,
				description: Sequelize.TEXT,
				deadline: Sequelize.DATE,
				IsDeleted:{
						type: Sequelize.BOOLEAN,
						allowNull: false
					}
				});
			return data;
		},
	}

var schema = require('./sqlSchema.js');
	//Create Users Table by sync.
	schema.User().sync().then(function(d){
	}).catch(function(err){
	});

	//RelationShip between Project and User.
	schema.Project().belongsTo(schema.User());

	//RelationShip between Task and User.
	schema.Task().belongsTo(schema.User());

	//Create Projects Table by sync.
	schema.Project().sync().then(function(d){
	}).catch(function(err){
	});

	//Create Tasks Table by sync.
	schema.Task().sync().then(function(d){
	}).catch(function(err){
	});