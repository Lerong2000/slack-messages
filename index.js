require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;
const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.render('index.ejs');
})

app.post('/form-submit', (req, res) => {
	axios
		.post(SLACK_WEBHOOK, {
			text: `Message: ${req.body.message}`
		})
		.then(() => {
			res.send('Form submitted!')
		})
		.catch(() => {
			res.send('Form submission failed!')
	})	
})

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}!`);
})
