interface ExecFunc {
  (): void;
}
export const exec: ExecFunc = function () {
  console.log("exec");
};
