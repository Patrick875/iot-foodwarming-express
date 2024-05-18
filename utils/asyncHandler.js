module.exports = (fn) => {
	return async (req, res, next) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			console.log("errr", error);
			return res.status(500).json({
				message: "server error",
				status: "Request failed",
			});
		}
	};
};
