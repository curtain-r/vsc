import {ExtensionContext, window} from 'vscode';
import { ContextGlobalState } from '../type';
export const getDisposableTextEditorSelectionListener = (context: ExtensionContext) => {
    return window.onDidChangeTextEditorSelection((event) => {
        const editor = event.textEditor;
        const selection = editor.selection;
        if (selection.isEmpty) {
            console.log('所选热区为空!!');
            return;
        }
        const startIndex = selection.start.line;
        const endIndex = selection.end.line;
        const codeRange: ContextGlobalState['codeRange'] = {
            startIndex,
            endIndex,
        };
        context.globalState.update('codeRange', codeRange);
        console.log(`热区代码范围已初始化为: ${startIndex + 1} - ${endIndex + 1}`);   
    });
};