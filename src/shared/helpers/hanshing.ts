import bcrypt from 'bcrypt';

const hashsingPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
}

const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
}

export { hashsingPassword, verifyPassword };