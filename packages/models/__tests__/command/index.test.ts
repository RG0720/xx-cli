import { Command } from "../../src/command";
class InitCommand extends Command<string> {}

class InitImpl extends Command<string> {
  init() {}
  exec() {}
}

describe("test Command Initialize", () => {
  it("when init method didn't be implemented, throw error", () => {
    const init = new InitCommand("");
    expect(init.init).toThrow();
  });

  it("when exec method didn't be implemented, throw error", () => {
    const init = new InitCommand("");
    expect(init.exec).toThrow();
  });

  it("when node version check failed, throw error", () => {
    const init = new InitImpl("");
    jest.spyOn(init, "checkNodeVersion").mockImplementation(() => {
      throw new Error();
    });
    expect(init.checkNodeVersion).toThrowError();
    expect(init.do).toThrow();
  });

  it("when node version check success, run normally", () => {
    const init = new InitImpl("");
    jest.spyOn(init, "checkExecEnv").mockImplementation(() => true);
    const initFun = jest.spyOn(init, "init");
    const execFun = jest.spyOn(init, "exec");
    expect(init.checkExecEnv()).toBeTruthy();
    expect(init.do()).toBeTruthy();
    expect(initFun).toBeCalledTimes(1);
    expect(execFun).toBeCalledTimes(1);
  });

  it("when node version less then develop version, it will throw an error", () => {
    const init = new InitImpl("");
    jest.spyOn(init, "checkNodeVersion").mockImplementation(() => false);
    expect(init.checkExecEnv).toThrow();
    const catchFn = jest.fn();
    try {
      init.checkExecEnv();
    } catch (e) {
      catchFn();
    }
    expect(catchFn).toHaveBeenCalled();
  });

  it("when node version gather then develop version, it will return true", () => {
    const init = new InitImpl("");
    expect(init.checkNodeVersion()).toBeTruthy();
  });
});
