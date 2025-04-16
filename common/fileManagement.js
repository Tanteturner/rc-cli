import fs from 'node:fs';
import output from '../output.js';

export class FileManagement {
    static loadFile(path) {
        return fs.readFileSync(path, 'utf8');
    }

    static loadOrcf(path) {
        return JSON.parse(this.loadFile(path));
    }

    static saveFile(path,content) {
        fs.writeFile(path, content, err => {
            if (err) {
                output.error(err);
            } else {
                output.info(`Saved file to ${path}`)
            }
        });
    }

    static saveOrcf(path,content) {
        this.saveFile(path,JSON.stringify(content));
    }
}