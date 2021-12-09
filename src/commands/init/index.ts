import { CreateOrInitCommand } from './CreateOrInitCommand';
import { LocalPackage } from '@/models/package';
import { resolve } from 'path';
import { log } from '@/utils/log';
import { Logger } from 'npmlog';

interface CreateCommandParam {
  projectName: string;
  force?: boolean;
}

interface InitCommandParam {
  force?: boolean;
  Tp?: string;
}

interface ArgvOption {
  projectName: string;
  force?: boolean;
  templateDir?: string;
}

export class CreateCommand extends CreateOrInitCommand {

  constructor(argv: ArgvOption, log: Logger) {
    super(argv, log);
  }

  protected async init() {}
  protected async exec() {}
}

export class InitCommand extends CreateOrInitCommand {
  options: Partial<ArgvOption> | undefined;

  constructor(argv: ArgvOption, log: Logger) {
    super(argv, log);
  }

  protected async init() {
    this.log.info('argvObject', `${this.argv}`)
    let { projectName, templateDir } = this.argv
    await this.checkDir(projectName)
    await this.loadConfig(templateDir)
    let answers = await this.inquirerUser()
    
    if (!templateDir) this.log.warn('initCommit', '未提供模板名称或模板路径');
    else {
      let pkg = new LocalPackage({
        storageDir: templateDir
      });

      let info = await pkg.loadLocalPkgInfo()

      if (JSON.parse(info).version) {
        let targetDir = resolve(process.cwd(), projectName)
        await pkg.download(targetDir)
        await pkg.renderEjs(targetDir, answers)
      }
      this.log.info('configObject', answers)
    }

  }
  protected async exec() {}
}

export const createExec = (...params: [CreateCommandParam, any[]]) => {
  const [options] = params;
  const command = new CreateCommand(options, log);
  command.do();
}

export const initExec = (...params: [string, InitCommandParam]) => {
  try {
    const [projectName, { force, Tp }] = params;
    const options = { projectName, force, templateDir: Tp  }
    const command = new InitCommand(options, log);
    command.do(options);
  } catch (err) {
    log.info('initError', `${err}`)
  }
};
