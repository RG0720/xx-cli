import { Package, PackageProps } from '.';
import { log } from '@/utils/log';
import { resolve } from 'path';
import fs from 'fs-extra';

export class LocalPackage extends Package {
  constructor (options: PackageProps) {
    super(options);
  }

  async download(targetDir: string) {
    try {
      fs.copySync(resolve(this.storageDir), targetDir)
      log.info('写入模板成功!', '')
    } catch (err) {
      throw new Error(`写入模板失败: ${err}`);
    }
  }
}
