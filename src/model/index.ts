import { TextEditor, Range, commands, window, Uri } from "vscode";
import { HistoryManager } from "../utils/history";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

export class Prediction {
  private historyManager: HistoryManager;
  constructor() {
    this.historyManager = new HistoryManager();
    this.registCommand();
  }

  private registCommand() {
    commands.registerCommand("vam.vam", () => {
      const editor = window.activeTextEditor;
      if (!editor) {
        return;
      }
      const predictionParams = this.getPredictionParams(editor);
      
      // 创建目录（如果不存在）
      const dirPath = path.join(os.homedir(), ".kwaipilot");
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      
      // CSV文件路径
      const filePath = path.join(dirPath, "prediction-data.csv");
      
      // 如果文件不存在，创建文件并添加标题行
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "timestamp,content\n");
      }
      
      // 创建CSV行：时间戳和完整的JSON字符串
      // 使用双引号包裹JSON字符串，避免CSV格式问题
      const timestamp = new Date().getTime();
      const jsonContent = JSON.stringify(predictionParams);
      // 为CSV格式处理JSON字符串中的双引号（替换为两个双引号）
      const escapedContent = jsonContent.replace(/"/g, '""');
      const csvLine = `${timestamp},"${escapedContent}"\n`;
      
      // 追加到CSV文件
      fs.appendFileSync(filePath, csvLine);
    });
  }
  
  private getPredictionParams(editor: TextEditor) {
    const cursorPosition = editor.selection.active;
    const cursorOffset = editor.document.offsetAt(cursorPosition);
    const id = Math.random().toString(36).substring(2, 15);
    const history = [this.historyManager.getTargetHistory(editor.document.uri.path), editor.document.getText()];
    const language = editor.document.languageId;
    const content = editor.document.getText();
    return { cursorOffset, id, history, language, content };
  }
}
