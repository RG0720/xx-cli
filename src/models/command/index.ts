import { Loggable } from '@/utils';
import { checkVersion, DEV_NODE_VERSION } from '@/utils/version';

export class Command<T> extends Loggable {
  argv: T;
  options: Partial<T> | undefined;
  constructor(argv: T) {
    super();
    this.argv = argv;
    this.logVerbose('argv', JSON.stringify(this.argv));
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

  protected async init(options?: unknown) {
    throw new Error('init method must be implemented by sub class');
  }

  protected async exec() {
    throw new Error('exec method must be implemented by sub class');
  }

  async do(options?: unknown): Promise<boolean | undefined> {
    this.checkExecEnv();
    await this.init(options);
    await this.exec();
    return true;
  }
}
