import { initExec } from "../../src";

it("InitCommand do之后返回true，没有抛出异常", () => {
  expect(() => initExec({ force: true }, [])).not.toThrow();
});
