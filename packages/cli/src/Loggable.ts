import { log } from '@rg1115/utils';

export class Loggable {
  logNotice(prefix: string, message: string, ...args: any[]) {
    this.log('notice', prefix, message, ...args);
  }

  logError(prefix: string, message: string, ...args: any[]) {
    this.log('error', prefix, message, ...args);
  }

  logVerbose(prefix: string, message: string, ...args: any[]) {
    this.log('verbose', prefix, message, ...args);
  }

  log(level: string, prefix: string, message: string, ...args: any[]) {
    log[level](prefix, message, ...args);
  }
}
