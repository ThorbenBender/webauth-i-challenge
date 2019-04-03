function isAuthed(req, res, next) {
	console.log(req);
	if (req.session && req.session.user) {
		next();
	} else {
		res.status(401).json({ message: 'inauthorized' });
	}
}

module.exports = isAuthed;
