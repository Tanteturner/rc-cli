import fs from 'node:fs';
import path from 'node:path';
import config from '../config.js';
import output from '../output.js';

function readNl2Csv(inputPath, delimiter){
    let points = []

    try {
        const data = fs.readFileSync(inputPath, 'utf8');

        let lines = data.split(/\r\n|\r|\n/).map(line => line.split(delimiter));
        
        let header = lines.shift().map(elem => elem.replaceAll(".","").replaceAll("\"",""));

        points = lines.map(line => {
            let newLine = {};
            line.forEach((elem,i) => {
                newLine[header[i].toLowerCase()] = elem
            });
            return newLine;
        });

    } catch (err) {
        output.error(err);
        return;
    }

    return points;
}

function convert(inputPath) {
    let points = readNl2Csv(inputPath, "\t");
    if(points == undefined) return;

    output.info(`Converting ${inputPath}...`)

    // Map NL2 data to orcf data
    const fileData = {
        header: {
            version: config.formatVersion,
        },
        trackPoints: points.map(point => {
            return {
                pos: [point.posx, point.posy, point.posz],
                up: [point.upx, point.upy, point.upz],
                right: [-point.leftx, -point.lefty, -point.leftz],
                forward: [point.frontx, point.fronty, point.frontz]
            }}
        ),
        trackElements: []
    };

    const exportPath = path.format({ ...path.parse(inputPath), base: '', ext:'.orcf'})

    fs.writeFile(exportPath, JSON.stringify(fileData), err => {
        if (err) {
            output.error(err);
        } else {
            output.info(`Saved converted file to ${exportPath}`)
        }
    });
}

export default convert;