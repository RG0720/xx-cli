import { Loggable } from '@/utils';
import { pathExistsSync, readJsonSync } from 'fs-extra';
import { join } from 'path';

export interface PackageProps {
  name: string;
  version: string;
  storageDir: string;
}

export interface PackageMethods {
  getExecFilePath: () => Promise<string | undefined>;
  getSourceDir: () => Promise<string | void>;
}

export type PackageInterface = PackageMethods & PackageProps;

export class Package extends Loggable implements PackageInterface {
  name: string;
  version: string;
  storageDir: string;
  loadExecFile: boolean = false;
  execFilePath: string = '';
  constructor(options: PackageProps) {
    super();
    const { name, version, storageDir } = options;
    this.name = name;
    this.version = version || 'latest';
    this.storageDir = storageDir;
  }

  async getSourceDir() {
    return this.storageDir;
  }

  async getPackageJsonPath(sourceDir: string) {
    const pkgJsonPath = join(sourceDir, 'package.json');
    if (!pathExistsSync(pkgJsonPath)) {
      throw new Error(`can't find package.json file`);
    }
    return pkgJsonPath;
  }

  async getExecFilePath() {
    if (this.loadExecFile) {
      return this.execFilePath;
    }
    let execFilePath = '';
    const sourceDir = await this.getSourceDir();
    const pkgJsonPath = await this.getPackageJsonPath(sourceDir);
    const pkgJson = readJsonSync(pkgJsonPath);
    if (pkgJson.main) {
      execFilePath = join(sourceDir, pkgJson.main);
    } else if (pkgJson.module) {
      execFilePath = join(sourceDir, pkgJson.module);
    } else if (pathExistsSync(join(sourceDir, 'index.js'))) {
      execFilePath = join(sourceDir, 'index.js');
    } else {
      throw new Error(`can't find package exec file`);
    }
    this.loadExecFile = true;
    this.execFilePath = execFilePath;
    return this.execFilePath;
  }

  execFile() {}
}
