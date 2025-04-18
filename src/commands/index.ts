import * as vscode from 'vscode';
import { CommandsMap } from './const';
import { ContextGlobalState } from '../type';

export function registerAllCommands(
  context: vscode.ExtensionContext,
) {
  for (const [command, callback] of Object.entries(
    commandsMap(
      context,
    ),
  )) {
    context.subscriptions.push(
      vscode.commands.registerCommand(command, callback),
    );
  }
}
const commandsMap: (
  context: vscode.ExtensionContext,
) => { [command: string]: (...args: any) => any } = (
  context,
) => {
  const commandMap = {
    [CommandsMap.showTargetCodeRange]: (filepath?: string, index?: number) => {
      const codeRange = context.globalState.get<ContextGlobalState['codeRange']>('codeRange');
      if (!codeRange) {
        console.log('未获取热区行号');
        return;
      }
      const { startIndex, endIndex } =  codeRange;
      console.log(`当前热区的行号范围为${startIndex + 1} - ${endIndex + 1}`);
    },
  };
  return commandMap;
};
