import * as THREE from 'three';

/**
 * Linearly interpolate between two vectors.
 */
function lerpVector(a, b, t) {
    return new THREE.Vector3().fromArray(a).lerp(new THREE.Vector3().fromArray(b), t);
}

/**
 * Resample the path with new points spaced at `sampleDist`.
 * @param {Array} points - Array of points with pos, up, right, forward
 * @param {number} sampleDist - Distance between resampled points
 * @returns {Array} - Resampled points
 */
export function resamplePoints(points, sampleDist) {
    if (points.length < 2) return [];

    let resampled = [];
    let distLeft = 0;

    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];

        const pos0 = new THREE.Vector3().fromArray(p0.pos);
        const pos1 = new THREE.Vector3().fromArray(p1.pos);

        const segmentVec = new THREE.Vector3().subVectors(pos1, pos0);
        const segmentLength = segmentVec.length();

        let segmentProgress = distLeft / segmentLength;

        while (segmentProgress < 1.0) {
            const pos = lerpVector(p0.pos, p1.pos, segmentProgress);
            const up = lerpVector(p0.up, p1.up, segmentProgress).normalize();
            const right = lerpVector(p0.right, p1.right, segmentProgress).normalize();
            const forward = lerpVector(p0.forward, p1.forward, segmentProgress).normalize();

            resampled.push({
                pos: pos.toArray(),
                up: up.toArray(),
                right: right.toArray(),
                forward: forward.toArray()
            });

            segmentProgress += sampleDist / segmentLength;
        }

        distLeft = (1 - (segmentProgress - sampleDist / segmentLength)) * segmentLength;
    }

    // Add the final point
    const last = points[points.length - 1];
    resampled.push({
        pos: last.pos,
        up: new THREE.Vector3().fromArray(last.up).normalize().toArray(),
        right: new THREE.Vector3().fromArray(last.right).normalize().toArray(),
        forward: new THREE.Vector3().fromArray(last.forward).normalize().toArray()
    });

    return resampled;
}
