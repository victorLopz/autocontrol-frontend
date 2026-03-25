type LogLevel = "info" | "warn" | "error";

class Logger {
  private formatMessage(level: LogLevel, message: string, meta?: unknown) {
    return {
      level,
      message,
      meta,
      timestamp: new Date().toISOString()
    };
  }

  info(message: string, meta?: unknown) {
    console.info(this.formatMessage("info", message, meta));
  }

  warn(message: string, meta?: unknown) {
    console.warn(this.formatMessage("warn", message, meta));
  }

  error(message: string, meta?: unknown) {
    console.error(this.formatMessage("error", message, meta));
  }
}

export const logger = new Logger();
