import { FileManagement } from "../common/fileManagement.js";
import { resamplePoints } from "../common/resamplePoints.js";

function mcfunction(inputPath, exportPath) {
    const coaster = FileManagement.loadOrcf(inputPath);

    const points = resamplePoints(coaster.trackPoints, 0.01);

    points.forEach((point, i) => {
        saveFile(point, i, exportPath);
    })
}

function saveFile(point, index, exportPath) {
    FileManagement.saveFile(`${exportPath}/${index}.mcfunction`, `tp @s ${point.pos[0]} ${point.pos[1]} ${point.pos[2]}`)
}

export default mcfunction;