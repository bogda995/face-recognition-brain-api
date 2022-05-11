const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host: 'postgresql-objective-85251',
		user: 'postgres',
		password: 'test',
		database: 'postgres'
	}
});

//knex database test
// db.select('*').from('users').then(data => {
// 	console.log(data);
// })
// db.select('*')
// 	.from('users').then(data => {
// 	console.log(data);
// });

const app = express();

// local database
// const database = {
// 	users: [
// 		{
// 			id: '123',
// 			name: 'Johnny',
// 			email: 'CaptainJohnny@email.com',
// 			password: 'rom',
// 			entries: 0,
// 			joined: new Date()
// 		},
// 		{
// 			id: '124',
// 			name: 'William',
// 			email: 'william@gmail.com',
// 			password: 'heart',
// 			entries: 0,
// 			joined: new Date()
// 		}
// 	]
// }

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('success');
})

//Dependency injection
app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT||3000, () => {
	console.log(`app is running on port: ${process.env.PORT}`)
})
