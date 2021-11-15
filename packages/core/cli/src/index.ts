#! /usr/bin/env node
import { program } from "commander";
import { exec } from "@rg1115/exec";
import { add } from "@rg1115/utils";
program.version("1.0.0");

console.log("xx执行啦");
exec();
console.log(add(1, 2));

// mkdir -p packages/core/cli
// cd pacakges/core/cli
// npm init -y
// npm install typescript -D
// npx tsc --init
// 更改继承关系，更改outDir
// npx tsc 将ts文件编译成js文件
// dist/index.js 文件生成
// 执行npm install -g 将包对应的bin命令安装到全局
// /usr/local/bin/xx -> /usr/local/lib/node_modules/@rg1115/cli/dist/index.js 绑定到全局
// 此时terminal输入xx可以看到terminal打印了”xx执行了“
