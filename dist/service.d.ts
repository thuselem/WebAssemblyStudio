import { File, Project } from "./model";
import "monaco-editor";
export declare enum Language {
    C = "c",
    Cpp = "cpp",
    Wast = "wast",
    Wasm = "wasm",
    Rust = "rust",
    Cretonne = "cton",
    x86 = "x86",
    Json = "json",
    JavaScript = "javascript",
    TypeScript = "typescript",
    Text = "text",
}
export interface IServiceRequestTask {
    file: string;
    name: string;
    output: string;
    console: string;
    success: boolean;
}
export interface IServiceRequest {
    success: boolean;
    tasks: IServiceRequestTask[];
    output: string;
}
export declare enum ServiceTypes {
    Rustc = 0,
    Service = 1,
}
export declare class Service {
    static sendRequestJSON(content: Object, to: ServiceTypes): Promise<IServiceRequest>;
    static sendRequest(content: string, to: ServiceTypes): Promise<IServiceRequest>;
    static getMarkers(response: string): monaco.editor.IMarkerData[];
    static compileFile(file: File, from: Language, to: Language, options?: string): Promise<any>;
    static compile(src: string | ArrayBuffer, from: Language, to: Language, options?: string): Promise<IServiceRequest>;
    static disassembleWasm(buffer: ArrayBuffer): Promise<string>;
    static disassembleWasmWithWabt(file: File): Promise<void>;
    static assembleWast(wast: string): Promise<ArrayBuffer>;
    static assembleWastWithWabt(file: File): Promise<void>;
    static createGist(json: object): Promise<string>;
    static loadJSON(uri: string): Promise<{}>;
    static saveJSON(json: object, uri: string): Promise<string>;
    static parseFiddleURI(): string;
    static exportToGist(content: File, uri?: string): Promise<string>;
    static saveProject(project: Project, openedFiles: string[][], uri?: string): Promise<string>;
    static loadProject(json: any, project: Project): Promise<any>;
    static lazyLoad(uri: string): Promise<any>;
    static optimizeWasmWithBinaryen(file: File): Promise<void>;
    static validateWasmWithBinaryen(file: File): Promise<void>;
    static validateWastWithBinaryen(file: File): Promise<void>;
    static disassembleWasmWithBinaryen(file: File): Promise<void>;
    static convertWasmToAsmWithBinaryen(file: File): Promise<void>;
    static downloadLink: HTMLAnchorElement;
    static download(file: File): void;
    static clangFormatModule: any;
    static clangFormat(file: File): Promise<void>;
    static disassembleX86(file: File, options?: string): Promise<void>;
    static compileMarkdownToHtml(src: string): Promise<string>;
}
