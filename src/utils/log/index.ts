import log from 'npmlog';

log.level = 'info';

log.heading = 'xx'; // 修改前缀
log.addLevel('success', 2000, { fg: 'green', bold: true }); // 添加自定义命令

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
