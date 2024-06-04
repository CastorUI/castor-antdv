export const handleCommand = (emitRegister, event, args = {}) => {
  if (Object.keys(emitRegister).length === 0) {
    console.error(`emitRegister中未注册任何事件`);
    return;
  }

  if (!event) {
    console.error(`事件名不能为空`);
    return;
  }

  const fn = emitRegister[event];
  if (!fn) {
    console.error(`当前事件【${event}】未在emitRegister中注册`);
    return;
  }

  Object.keys(args).length > 0 ? fn(args) : fn();
};
