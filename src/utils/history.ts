import { workspace, window } from "vscode";

export class HistoryManager {
  private historyMap: Record<string, string[]> = {};
  private historyStep: number = 10;

  constructor() {
    this.historyMap = {};
    this.registerListener();
  }

  private registerListener() {
    // 将打开的文件添加到historyMap中
    const activeDocuments = window.visibleTextEditors.map(editor => editor.document.fileName);
    activeDocuments.forEach((fileName) => {
      const document = workspace.textDocuments.find(doc => doc.fileName === fileName);
      if (document) {
        this.addHistory(fileName, document.getText());
      }
    });

    // 打开文件时执行，忽略outpu
    workspace.onDidOpenTextDocument((document) => {
      if (document.uri.scheme === "file") {
        this.addHistory(document.fileName, document.getText());
      }
    });
  }

  updateHistoryStep(size: number) {
    this.historyStep = size;
  }

  public addHistory(fileName: string, content: string) {
    if (!this.historyMap[fileName]) {
      this.historyMap[fileName] = [];
    }

    this.historyMap[fileName].push(content);

    if (this.historyMap[fileName].length > this.historyStep) {
      this.historyMap[fileName] = this.historyMap[fileName].slice(-this.historyStep);
    }
  }

  public getTargetHistory(fileName: string) {
    if (!this.historyMap[fileName]) {
      this.historyMap[fileName] = [""];
    }
    return this.historyMap[fileName][0];
  }
}
