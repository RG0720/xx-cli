import { Command } from '@/models';
import { Logger } from 'npmlog';
import { resolve } from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import ejs from 'ejs';

interface TemplateConfig {
  answer?: any;
  ignore?: (string | any[]);
}

interface ArgvOption {
  projectName: string;
  force?: boolean;
  templateDir?: string;
}

export class CreateOrInitCommand extends Command<ArgvOption> {
  targrtDir: string = '';
  isDirEmpty: boolean = true;
  baseConfigList: any[];
  templateConfig: TemplateConfig = {};

  constructor(argv: ArgvOption, log: Logger) {
    super(argv, log);
    this.baseConfigList = [{
      type: 'input',
      message: '为项目取个名字:',
      name: 'name',
      default: this.argv.projectName
    },{
        type: 'input',
        message: '为项目指定一个版本:',
        name: 'version',
        default: "0.0.1"
        // TODO: 校验版本号,
        // validate: function(val) {
        // }
    }];

  }

  async checkDir (projectName: string) {
    this.targrtDir = resolve(process.cwd(), projectName)
    const isDirEmpty = fs.existsSync(this.targrtDir);
    let answers = await inquirer.prompt([{
      type: 'list',
      message: `Target directory already exists. Pick an action: (Use arrow keys)`,
      // message: `Target directory ${this.argv.projectName} already exists. Pick an action: (Use arrow keys)`,
      name: 'cleanDir',
      choices: [
        'Overwrite',
        'Merge',
        'Cancel',
      ],
      when: () => {
        return isDirEmpty
      }
    }])
    switch(answers.cleanDir){
      case 'Overwrite':
        fs.removeSync(this.targrtDir)
        break;
      case 'Cancel':
        throw new Error('stop!');
    }
  }

  async loadConfig (templateDir) {
    var data = await fs.readJson(resolve(templateDir, 'xx.config.json'))
    let configList = data.answers
    this.templateConfig = data
    this.baseConfigList = this.baseConfigList.map(baseConfig => {
      return configList.find(item => item.name === baseConfig.name) || baseConfig
    })
  }

  async inquirerUser () {
    return inquirer.prompt(this.baseConfigList)
  }

}