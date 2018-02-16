import { File, Directory, Project } from "../model";
import { ProjectTemplate } from "../components/NewProjectDialog";
import Group from "../utils/group";
export declare enum AppActionType {
    ADD_FILE_TO = "ADD_FILE_TO",
    LOAD_PROJECT = "LOAD_PROJECT",
    INIT_STORE = "INIT_STORE",
    UPDATE_FILE_NAME_AND_DESCRIPTION = "UPDATE_FILE_NAME_AND_DESCRIPTION",
    DELETE_FILE = "DELETE_FILE",
    SPLIT_GROUP = "SPLIT_GROUP",
    OPEN_FILE = "OPEN_FILE",
    CLOSE_FILE = "CLOSE_FILE",
    SAVE_PROJECT = "SAVE_PROJECT",
    OPEN_PROJECT_FILES = "OPEN_PROJECT_FILES",
    FOCUS_TAB_GROUP = "FOCUS_TAB_GROUP",
    LOG_LN = "LOG_LN",
    SET_STATUS = "SET_STATUS",
    SANDBOX_RUN = "SANDBOX_RUN",
}
export interface AppAction {
    type: AppActionType;
}
export interface AddFileToAction extends AppAction {
    type: AppActionType.ADD_FILE_TO;
    file: File;
    parent: Directory;
}
export declare function addFileTo(file: File, parent: Directory): void;
export interface LoadProjectAction extends AppAction {
    type: AppActionType.LOAD_PROJECT;
    project: Project;
}
export declare function loadProject(project: Project): void;
export declare function initStore(): void;
export interface UpdateFileNameAndDescriptionAction extends AppAction {
    type: AppActionType.UPDATE_FILE_NAME_AND_DESCRIPTION;
    file: File;
    name: string;
    description: string;
}
export declare function updateFileNameAndDescription(file: File, name: string, description: string): void;
export interface DeleteFileAction extends AppAction {
    type: AppActionType.DELETE_FILE;
    file: File;
}
export declare function deleteFile(file: File): void;
export interface LogLnAction extends AppAction {
    type: AppActionType.LOG_LN;
    message: string;
    kind: ("" | "info" | "warn" | "error");
}
export declare function logLn(message: string, kind?: "" | "info" | "warn" | "error"): void;
export interface SplitGroupAction extends AppAction {
    type: AppActionType.SPLIT_GROUP;
}
export declare function splitGroup(): void;
export interface OpenFileAction extends AppAction {
    type: AppActionType.OPEN_FILE;
    file: File;
    preview: boolean;
}
export declare function openFile(file: File, preview?: boolean): void;
export interface CloseFileAction extends AppAction {
    type: AppActionType.CLOSE_FILE;
    file: File;
}
export declare function closeFile(file: File): void;
export interface OpenProjectFilesAction extends AppAction {
    type: AppActionType.OPEN_PROJECT_FILES;
    openedFiles: [string[]];
}
export declare function openProjectFiles(json: ProjectTemplate): Promise<void>;
export declare function saveProject(fiddle: string): Promise<void>;
export interface FocusTabGroupAction extends AppAction {
    type: AppActionType.FOCUS_TAB_GROUP;
    group: Group;
}
export declare function focusTabGroup(group: Group): void;
export interface SetStatusAction extends AppAction {
    type: AppActionType.SET_STATUS;
    status?: string;
}
export declare function setStatus(status: string): void;
export declare function clearStatus(): void;
export interface SandboxRunAction extends AppAction {
    type: AppActionType.SANDBOX_RUN;
    src: string;
}
export declare function runTask(name: string, optional?: boolean): Promise<void>;
export declare function run(): Promise<void>;
export declare function build(): Promise<void>;
