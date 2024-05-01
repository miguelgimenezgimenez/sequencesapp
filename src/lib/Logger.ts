import winston from 'winston'
import correlator from 'express-correlation-id'


class Logger {
  private logger: winston.Logger;
  constructor() {

    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          const correlationId = correlator.getId(); // Returns the current id or undefined
          return `${timestamp} [${correlationId}] ${level}: ${message}`;
        })
      ),
      transports: [
        new winston.transports.Console()
      ]
    });

  }
  public log(level: string, message: string | object, ...meta: any[]): void {
    if (process.env.NODE_ENV === "test") {
      return
    }
    const text = typeof message === 'object' ? message.toString() : message;
    this.logger.log(level, text, meta);
  }

  public debug(message: string | object, ...meta: any[]): void {
    this.log('debug', message, meta);
  }

  public info(message: string | object, ...meta: any[]): void {
    this.log('info', message, meta);
  }

  public warn(message: string | object, ...meta: any[]): void {
    this.log('warn', message, meta);
  }

  public error(message: string | object, ...meta: any[]): void {
    this.log('error', message, ...meta);
  }
}

export default Logger;
