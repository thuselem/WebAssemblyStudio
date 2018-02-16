/* Copyright 2018 Mozilla Foundation
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import dispatcher from "../dispatcher";
import { File, Directory, Project, filetypeForExtension } from "../model";
import { App } from "../components/App";
import { ProjectTemplate } from "../components/NewProjectDialog";
import appStore from "../stores/AppStore";
import { Service, Language } from "../service";
import Group from "../utils/group";
import { Gulpy } from "../gulpy";
import { Errors } from "../errors";

export enum AppActionType {
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

export function addFileTo(file: File, parent: Directory) {
  dispatcher.dispatch({
    type: AppActionType.ADD_FILE_TO,
    file,
    parent,
  } as AddFileToAction);
}

export interface LoadProjectAction extends AppAction {
  type: AppActionType.LOAD_PROJECT;
  project: Project;
}

export function loadProject(project: Project) {
  dispatcher.dispatch({
    type: AppActionType.LOAD_PROJECT,
    project,
  } as LoadProjectAction);
}

export function initStore() {
  dispatcher.dispatch({
    type: AppActionType.INIT_STORE,
  } as AppAction);
}

export interface UpdateFileNameAndDescriptionAction extends AppAction {
  type: AppActionType.UPDATE_FILE_NAME_AND_DESCRIPTION;
  file: File;
  name: string;
  description: string;
}

export function updateFileNameAndDescription(file: File, name: string, description: string) {
  dispatcher.dispatch({
    type: AppActionType.UPDATE_FILE_NAME_AND_DESCRIPTION,
    file,
    name,
    description,
  } as UpdateFileNameAndDescriptionAction);
}

export interface DeleteFileAction extends AppAction {
  type: AppActionType.DELETE_FILE;
  file: File;
}

export function deleteFile(file: File) {
  dispatcher.dispatch({
    type: AppActionType.DELETE_FILE,
    file,
  } as DeleteFileAction);
}

export interface LogLnAction extends AppAction {
  type: AppActionType.LOG_LN;
  message: string;
  kind: ("" | "info" | "warn" | "error");
}

export function logLn(message: string, kind: "" | "info" | "warn" | "error" = "") {
  dispatcher.dispatch({
    type: AppActionType.LOG_LN,
    message,
    kind,
  } as LogLnAction);
}

export interface SplitGroupAction extends AppAction {
  type: AppActionType.SPLIT_GROUP;
}

export function splitGroup() {
  dispatcher.dispatch({
    type: AppActionType.SPLIT_GROUP
  } as SplitGroupAction);
}

export interface OpenFileAction extends AppAction {
  type: AppActionType.OPEN_FILE;
  file: File;
  preview: boolean;
}

export function openFile(file: File, preview = true) {
  dispatcher.dispatch({
    type: AppActionType.OPEN_FILE,
    file,
    preview
  } as OpenFileAction);
}

export interface CloseFileAction extends AppAction {
  type: AppActionType.CLOSE_FILE;
  file: File;
}

export function closeFile(file: File) {
  dispatcher.dispatch({
    type: AppActionType.CLOSE_FILE,
    file
  } as CloseFileAction);
}

export interface OpenProjectFilesAction extends AppAction {
  type: AppActionType.OPEN_PROJECT_FILES;
  openedFiles: [string[]];
}

export async function openProjectFiles(json: ProjectTemplate) {
  const newProject = new Project();
  await Service.loadProject(json, newProject);
  const { openedFiles } = json;

  dispatcher.dispatch({
    type: AppActionType.LOAD_PROJECT,
    project: newProject
  } as LoadProjectAction);

  dispatcher.dispatch({
    type: AppActionType.OPEN_PROJECT_FILES,
    openedFiles
  } as OpenProjectFilesAction);
}

export async function saveProject(fiddle: string) {
  logLn("Saving Project ...");
  const tabGroups = appStore.getTabGroups();
  const projectModel = appStore.getProject().getModel();

  const openedFiles = tabGroups.map((group) => {
    return group.files.map((file) => file.getPath());
  });

  await Service.saveProject(projectModel, openedFiles, fiddle);
  logLn("Saved Project OK");
}

export interface FocusTabGroupAction extends AppAction {
  type: AppActionType.FOCUS_TAB_GROUP;
  group: Group;
}

export function focusTabGroup(group: Group) {
  dispatcher.dispatch({
    type: AppActionType.FOCUS_TAB_GROUP,
    group
  } as FocusTabGroupAction);
}

export interface SetStatusAction extends AppAction {
  type: AppActionType.SET_STATUS;
  status?: string;
}

export function setStatus(status: string) {
  dispatcher.dispatch({
    type: AppActionType.SET_STATUS,
    status,
  } as SetStatusAction);
}

export function clearStatus() {
  dispatcher.dispatch({
    type: AppActionType.SET_STATUS,
  } as SetStatusAction);
}

export interface SandboxRunAction extends AppAction {
  type: AppActionType.SANDBOX_RUN;
  src: string;
}

export async function runTask(name: string, optional: boolean = false) {
  const run = async (src: string) => {
    const gulp = new Gulpy();
    const project = appStore.getProject().getModel();
    const context = {
      gulp,
      project,
      Service,
      Language,
      logLn,
      filetypeForExtension,
    };
    Function.apply(null, Object.keys(context).concat(src)).apply(gulp, Object.values(context));
    if (gulp.hasTask(name)) {
      try {
        await gulp.run(name);
      } catch (e) {
        logLn(e.message, "error");
      }
    } else if (!optional) {
      logLn(`Task ${name} is not optional.` , "error");
    }
  };
  const buildTsFile = appStore.getFileByName("build.ts");
  const buildJsFile = appStore.getFileByName("build.js");
  if (buildTsFile) {
    const output = await buildTsFile.getModel().getEmitOutput();
    await run(output.outputFiles[0].text);
  } else if (buildJsFile) {
    await run(appStore.getFileSource(buildJsFile));
  } else {
    logLn(Errors.BuildFileMissing, "error");
  }}

export async function run() {
  const file = appStore.getFileByName("src/main.html");
  let src = appStore.getFileSource(file);

  src = src.replace(/src\s*=\s*"(.+?)"/, (a: string, b: any) => {
    const bFile = appStore.getFileByName(b);
    const src = appStore.getFileBuffer(bFile).getValue();
    const blob = new Blob([src], { type: "text/javascript" });
    return `src="${window.URL.createObjectURL(blob)}"`;
  });

  const projectModel = appStore.getProject().getModel();
  dispatcher.dispatch({
    type: AppActionType.SANDBOX_RUN,
    src,
  } as SandboxRunAction);
}

export async function build() {
  setStatus("Building Project ...");
  await runTask("default");
  clearStatus();
}
