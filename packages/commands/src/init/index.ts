import { Command } from '@rg1115/models';
interface InitCommandParam {
  force?: boolean;
}

export class InitCommand extends Command<InitCommandParam> {
  init() {}
  exec() {}
}

export const initExec = (...params: [InitCommandParam, any[]]) => {
  const [options] = params;
  const command = new InitCommand(options);
  command.do();
};
