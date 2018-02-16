/// <reference types="react" />
import * as React from "react";
import { Project, File, Directory, ModelRef } from "../model";
import { SplitInfo } from "./Split";
import { ToastContainer } from "./Toasts";
export interface AppState {
    project: ModelRef<Project>;
    file: ModelRef<File>;
    fiddle: string;
    /**
     * If not null, the the new file dialog is open and files are created in this
     * directory.
     */
    newFileDialogDirectory?: ModelRef<Directory>;
    /**
     * If not null, the the edit file dialog is open.
     */
    editFileDialogFile?: ModelRef<File>;
    /**
     * If true, the share fiddle dialog is open.
     */
    shareDialog: boolean;
    /**
     * If true, the new project dialog is open.
     */
    newProjectDialog: boolean;
    /**
     * Primary workspace split state.
     */
    workspaceSplits: SplitInfo[];
    /**
     * Secondary console split state.
     */
    consoleSplits: SplitInfo[];
    /**
     * Editor split state.
     */
    editorSplits: SplitInfo[];
    /**
     * If not null, the upload file dialog is open.
     */
    uploadFileDialogDirectory: ModelRef<Directory>;
    /**
     * If true, the new directory dialog is open.
     */
    newDirectoryDialog: ModelRef<Directory>;
    showProblems: boolean;
    showSandbox: boolean;
}
export interface AppProps {
    embed: boolean;
    fiddle: string;
}
export declare class App extends React.Component<AppProps, AppState> {
    fiddle: string;
    toastContainer: ToastContainer;
    constructor(props: AppProps);
    initializeProject(): Promise<void>;
    loadProjectFromFiddle(): Promise<void>;
    bindAppStoreEvents(): void;
    loadReleaseNotes(): Promise<void>;
    registerShortcuts(): void;
    logLn(message: string, kind?: "" | "info" | "warn" | "error"): void;
    componentWillMount(): void;
    componentDidMount(): void;
    share(): void;
    update(): Promise<void>;
    fork(): Promise<void>;
    gist(fileOrDirectory?: File): Promise<void>;
    download(): Promise<void>;
    /**
     * Remember workspace split.
     */
    private workspaceSplit;
    makeToolbarButtons(): JSX.Element[];
    render(): JSX.Element;
}
