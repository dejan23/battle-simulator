const parseMysqlObject = (obj) => obj.map((el) => el.get({ plain: true }));

export default parseMysqlObject;
