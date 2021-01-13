import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

export * from './api-errors';
export * from './check-methods';
export * from './paginated-response';
export * from './swagger';

const existsFile = promisify(fs.exists);

export function hideNumbers(value: string, replaceSymbol = '<!>') {
	return value.replace(/\d+/g, replaceSymbol);
}


export function getFileNameFromUrl(audioUrl: string) {
	return audioUrl.substring(audioUrl.lastIndexOf('/') + 1);
}

export async function isExistedFile(url: string, fileDirPath: string) {
	return await existsFile(path.join(fileDirPath, getFileNameFromUrl(url)));
}