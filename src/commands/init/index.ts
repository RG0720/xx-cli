import { Command } from '@/models';

interface InitCommandParam {
  force?: boolean;
}

interface CreateCommandParam {
  force?: boolean;
}

export class InitCommand extends Command<InitCommandParam> {
  init() {}
  exec() {}
}

export class CreateCommand extends Command<CreateCommandParam> {
  init() {}
  exec() {}
}

export const initExec = (...params: [InitCommandParam, any[]]) => {
  const [options] = params;
  const command = new InitCommand(options);
  command.do();
};

export const createExec = (...params: [InitCommandParam, any[]]) => {
  const [options] = params;
  const command = new CreateCommand(options);
  command.do();
};
