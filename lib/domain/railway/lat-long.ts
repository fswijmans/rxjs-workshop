const EARTH_RADIUS = 6371E3;

export class LatLong {

    /**
     * Creates a new geographic coordinate based on latitude and longitude.
     */
    constructor(
        public readonly latitude: number,
        public readonly longitude: number
    ) { }

    /**
     * Computes the distance to the specified latitude/longitude coordinate relative to the coordinate on which the method is called.
     */
    public distanceTo(other: LatLong): number {
        const latitude1 = toRadians(this.latitude);
        const latitude2 = toRadians(other.latitude);
        const longitude1 = toRadians(this.longitude);
        const longitude2 = toRadians(other.longitude);

        const deltaLatitude = latitude2 - latitude1;
        const deltaLongitude = longitude2 - longitude1;

        const a = square(Math.sin(deltaLatitude / 2)) + Math.cos(latitude1) * Math.cos(latitude2) * square(deltaLongitude / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS * c;
    }

    /**
     * Computes the latitude/longitude coordinate that lies at the specified offset of the linear interpolation between the given coordinate
     * and the coordinate on which this method is called. The offset is expected to be normalised, where an offset of 0.0 is equal to the
     * coordinate in which this method is called and where an offset of 1.0 is equal to the other coordinate.
     */
    public interpolate(other: LatLong, offset: number): LatLong {
        return new LatLong(
            this.latitude * (1 - offset) + other.latitude * offset,
            this.longitude * (1 - offset) + other.longitude * offset
        );
    }

    public toString(): string {
        return `(${this.latitude}, ${this.longitude})`;
    }

}

function toRadians(degrees: number): number {
    return degrees * Math.PI / 180;
}

function square(x: number): number {
    return x * x;
}
