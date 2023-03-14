
import jwt from 'jsonwebtoken';

function generateToken(email, userName, userId) {

  const secret = 'ON6T@axIhjM8Yu2/&ifA';

  return jwt.sign({ infoUser: { email, userName, userId } }, secret, { expiresIn: 60 * 60 * 5 });
}

export { generateToken };