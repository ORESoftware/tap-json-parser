/// <reference types="node" />
import * as stream from 'stream';
export interface IParsedObject {
    [index: string]: any;
}
export default function (): stream.Transform;
