import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [ip: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

/**
 * Middleware manual simples para Rate Limiting (Prevenção de Brute Force / API Abuse).
 * Em produção idealmente usaríamos redis + express-rate-limit.
 * @param limit Número máximo de requisições permitidas
 * @param windowMs Janela de tempo em milissegundos
 */
export const rateLimit = (limit: number, windowMs: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    if (!store[ip]) {
      store[ip] = { count: 1, resetTime: now + windowMs };
      return next();
    }

    const record = store[ip];

    // Se o tempo resetou
    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
      return next();
    }

    // Se excedeu o limite
    if (record.count >= limit) {
      const retryAfter = Math.ceil((record.resetTime - now) / 1000);
      res.set('Retry-After', String(retryAfter));
      res.status(429).json({
        ok: false,
        message: `Muitas requisições. Tente novamente em ${retryAfter} segundos.`,
      });
      return;
    }

    // Incrementa contador
    record.count++;
    next();
  };
};
