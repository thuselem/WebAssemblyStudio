/// <reference types="react" />
import * as React from "react";
import { ChangeEventHandler } from "react";
export declare class Spacer extends React.Component<{
    height: number;
}, {}> {
    render(): JSX.Element;
}
export declare class Divider extends React.Component<{
    height: number;
}, {}> {
    render(): JSX.Element;
}
export declare class TextInputBox extends React.Component<{
    label: string;
    value: string;
    error?: string;
    onChange?: ChangeEventHandler<any>;
}, {}> {
    constructor(props: any);
    render(): JSX.Element;
}
export declare class FileUploadInput extends React.Component<{
    label: string;
    onChange?: ChangeEventHandler<any>;
}, {}> {
    inputElement: any;
    constructor(props: any);
    open(): void;
    render(): JSX.Element;
}
export declare class ListItem extends React.Component<{
    label: string;
    onClick?: Function;
    icon?: JSX.Element;
    selected?: boolean;
    value: any;
    error?: string;
}, {}> {
    render(): JSX.Element;
}
export declare class ListBox extends React.Component<{
    height: number;
    value?: any;
    onSelect?: (value: any) => void;
}, {}> {
    constructor(props: any);
    render(): JSX.Element;
}
