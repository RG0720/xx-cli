import { log, checkVersion, DEV_NODE_VERSION } from '@rg1115/utils';

export class Command<T> {
  argv: T;
  options: Partial<T> | undefined;
  constructor(argv: T) {
    this.argv = argv;
    log.verbose('argv', JSON.stringify(this.argv));
  }

  checkNodeVersion() {
    return checkVersion();
  }

  checkExecEnv() {
    if (!this.checkNodeVersion()) {
      throw new Error(
        `the node version you used must be gather then ${DEV_NODE_VERSION}`,
      );
    }
  }

  init() {
    throw new Error('init method must be implemented by sub class');
  }

  exec() {
    throw new Error('exec method must be implemented by sub class');
  }

  do(): boolean | undefined {
    this.checkExecEnv();
    this.init();
    this.exec();
    return true;
  }
}
