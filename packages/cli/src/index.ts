import { Loggable } from './Loggable';
import { homedir } from 'os';
import { env } from 'process';
import { resolve, join } from 'path';
import { writeFileSync } from 'fs';
import { Command } from 'commander';
import rootCheck from 'root-check';
import pathExists from 'path-exists';
import { events } from '@rg1115/utils';
import { CLI_DEFAULT_HOME, CLI_ENV_FILE_NAME } from '@rg1115/models';
import { initExec } from '@rg1115/commands';
import dotEnv from 'dotenv';

export interface PkgInterface {
  version: string;
  bin: { [key: string]: string };
}

export interface CLIOptions {
  userHome?: string;
}

export class XXCli extends Loggable {
  readonly program: Command;
  readonly userHome: string;
  readonly pkg: PkgInterface;

  constructor(program: Command, pkg: PkgInterface, options: CLIOptions = {}) {
    super();
    this.program = program;
    this.userHome = options.userHome || homedir();
    this.pkg = pkg;
  }

  noticeCurrentVersion() {
    this.logNotice('current cli version is', this.pkg.version);
  }

  rootDowngrading() {
    rootCheck();
  }

  async checkGlobalUpdate() {}

  async registerCommand() {
    this.registerLocal();
    await this.registerRemote();
  }

  registerLocal() {
    const { program, pkg } = this;
    program
      .name(Object.keys(pkg.bin)[0])
      .usage('<command> [options]')
      .option('-d, --debug', 'Whether to enable debugging mode', false)
      .option('-l, --local <local>', 'Specify the local debug file path', '')
      .description('A scaffolding for an engineered solution')
      .version(pkg.version);

    program
      .command('init')
      .option('-f, --force', 'Whether to force initialization', false)
      .description('Initialize a project')
      .action(initExec);

    // listening to options, if debug is true, change the log level
    program.on('option:debug', function () {
      if (program.opts().debug) {
        events.emit('LOG_LEVEL_CHANGE', 'verbose');
      }
    });

    program.on('option:local', function () {
      env.CLI_LOCAL = program.opts().local;
    });
  }

  async registerRemote() {}

  envFileExists(dotenvPath: string) {
    return pathExists.sync(dotenvPath);
  }

  loadEnv() {
    const dotenvPath = resolve(this.userHome, CLI_ENV_FILE_NAME);
    if (this.envFileExists(dotenvPath)) {
      // load env to process.env
      dotEnv.config({ path: dotenvPath });
    } else {
      // create demo file
      writeFileSync(dotenvPath, 'KEY=VALUE');
    }
    this.createDefaultConfig();
    events.emit('CLI_BASEURL_CHANGE', env.XHH_CLI_BASE_URL);
    this.logVerbose('env config', JSON.stringify(env));
  }

  createDefaultConfig() {
    if (env.CLI_HOME) {
      env.CLI_HOME_PATH = join(this.userHome, env.CLI_HOME);
    } else {
      env.CLI_HOME_PATH = join(this.userHome, CLI_DEFAULT_HOME);
    }
  }

  async prepare() {
    this.noticeCurrentVersion();
    this.rootDowngrading();
    this.loadEnv();
    await this.checkGlobalUpdate();
  }

  async run() {
    try {
      await this.prepare();
      await this.registerCommand();
    } catch (e) {
      this.logError('xx cli run throw error', String(e));
    }
  }
}

export interface XXCliInit {
  (program: Command, pkg: PkgInterface): Promise<XXCli>;
}

export const init: XXCliInit = async (program: Command, pkg: PkgInterface) => {
  const cli = new XXCli(program, pkg);
  await cli.run();
  return cli;
};
