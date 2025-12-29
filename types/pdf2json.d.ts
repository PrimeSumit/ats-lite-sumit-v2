declare module "pdf2json" {
  class PDFParser {
    constructor(context: any, needRawText: number);
    on(event: string, callback: (data: any) => void): void;
    parseBuffer(buffer: Buffer): void;
    getRawTextContent(): string;
  }
  export default PDFParser;
}
