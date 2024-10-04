import { prisma } from './adminSetup.mjs';
import bcrypt from 'bcryptjs';

export const authenticate = async (email, password) => {
  if (email && password) {
    const user = await prisma.admin.findUnique({ where: { email } });

    if (!user || !user.isActive) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return Promise.resolve({ email: user.email, role: user.role });
    } else {
      return null;
    }
  }
  return null;
};
