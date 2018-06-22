const express = require('express');
const router = express.Router();
const qs = require('qs');
const {
	editBoard,
	editList,
	editCard,
} = require('../sequelize/data/put-methods');

router.put('/boards', (req, res) => {
	const q = qs.parse(req.query);
	const boardId = q.id;
	const title = q.title || '';
	const description = q.description || '';

	editBoard(boardId, title, description)
		.then(board => {
			res.status(200).json(board);
		})
		.catch(err => {
			console.log(err.stack);
			res.status(404).json(['Board could not be edited']);
		});
});

module.exports = router;