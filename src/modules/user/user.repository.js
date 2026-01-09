import db from "#config/db";

const create = async (data) => {
  const { name, username, password, role } = data;
  const [result] = await db.execute(
    "INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?)",
    [name, username, password, role]
  );
  return result;
};

const getAllUser = async () => {
  const [rows] = await db.execute("SELECT * FROM users");
  return rows;
};

const getById = async (id) => {
  const [result] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
  return result[0];
};

const getByUsername = async (username) => {
  const [result] = await db.execute("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return result[0];
};

export default {
  create,
  getAllUser,
  getById,
  getByUsername,
};
