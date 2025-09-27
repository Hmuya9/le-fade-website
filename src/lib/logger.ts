type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  userId?: string;
  requestId?: string;
  component?: string;
  action?: string;
  [key: string]: any;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isProduction = process.env.NODE_ENV === 'production';

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${contextStr}`;
  }

  private shouldLog(level: LogLevel): boolean {
    if (this.isDevelopment) return true;
    if (this.isProduction) return level !== 'debug';
    return true;
  }

  debug(message: string, context?: LogContext): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message, context));
    }
  }

  info(message: string, context?: LogContext): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message, context));
    }
  }

  warn(message: string, context?: LogContext): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, context));
    }
  }

  error(message: string, error?: Error, context?: LogContext): void {
    if (this.shouldLog('error')) {
      const errorContext = {
        ...context,
        error: error ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
        } : undefined,
      };
      console.error(this.formatMessage('error', message, errorContext));
    }
  }

  // Structured logging for business events
  event(eventName: string, properties?: Record<string, any>): void {
    this.info(`Event: ${eventName}`, { event: eventName, ...properties });
  }

  // Performance logging
  performance(operation: string, duration: number, context?: LogContext): void {
    this.info(`Performance: ${operation}`, { 
      operation, 
      duration, 
      ...context 
    });
  }
}

export const logger = new Logger();

// Convenience functions for common use cases
export const logError = (message: string, error?: Error, context?: LogContext) => 
  logger.error(message, error, context);

export const logInfo = (message: string, context?: LogContext) => 
  logger.info(message, context);

export const logWarn = (message: string, context?: LogContext) => 
  logger.warn(message, context);

export const logEvent = (eventName: string, properties?: Record<string, any>) => 
  logger.event(eventName, properties);

export const logPerformance = (operation: string, duration: number, context?: LogContext) => 
  logger.performance(operation, duration, context);
