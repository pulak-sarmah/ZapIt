import { prisma } from './adminSetup.mjs';

async function storeSession(sessionId, session, callback) {
  try {
    const expiresAt = new Date(Date.now() + session.cookie.maxAge);
    await prisma.session.upsert({
      where: { sid: sessionId },
      update: { data: JSON.stringify(session), expiresAt: expiresAt },
      create: {
        sid: sessionId,
        data: JSON.stringify(session),
        expiresAt: expiresAt,
      },
    });
    callback();
  } catch (err) {
    callback(err instanceof Error ? err : new Error(String(err)));
  }
}

async function getSession(sessionId, callback) {
  try {
    const session = await prisma.session.findUnique({
      where: { sid: sessionId },
    });
    callback(null, session ? JSON.parse(session.data) : null);
  } catch (err) {
    callback(err instanceof Error ? err : new Error(String(err)));
  }
}

async function destroySession(sessionId, callback) {
  try {
    await prisma.session.delete({ where: { sid: sessionId } });
    callback();
  } catch (err) {
    callback(err instanceof Error ? err : new Error(String(err)));
  }
}

export const sessionOptions = {
  secret:
    'supersecretkeykjegiuebpgvieubghvpqieurbgfvperiugbfpqeriufgbvepriubfgvepirubfgeriufgbe',
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000,
  },
  store: {
    get: getSession,
    set: storeSession,
    destroy: destroySession,
  },
};
