function parseMysqlObject(obj) {
	return obj.map((el) => el.get({ plain: true }));
}
module.exports = {
	parseMysqlObject,
};
