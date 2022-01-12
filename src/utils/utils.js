const parseMysqlObject = (obj) => obj.map((el) => el.get({ plain: true }));

module.exports = parseMysqlObject;
