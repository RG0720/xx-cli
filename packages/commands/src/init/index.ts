import { Command } from "@rg1115/models";
interface InitCommandParam {
  force?: boolean;
}

export class InitCommand extends Command<InitCommandParam> {
  constructor(params: InitCommandParam) {
    super(params);
  }
  init() {}
  exec() {}
}

export const initExec = (...params: [InitCommandParam, any[]]) => {
  const [options, ...others] = params;
  const command = new InitCommand(options);
  command.do();
};
