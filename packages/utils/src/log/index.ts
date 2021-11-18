import log, { Logger } from "npmlog";

log.level = "info";

log.heading = "xx"; // 修改前缀
log.addLevel("success", 2000, { fg: "green", bold: true }); // 添加自定义命令

export { log };
