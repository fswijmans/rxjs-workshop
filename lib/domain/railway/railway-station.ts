import { LatLong } from './lat-long';

export class RailwayStation {

    public static readonly AMS = new RailwayStation('AMS', 'Amsterdam Centraal', new LatLong(52.3791283, 4.8980833));
    public static readonly DB  = new RailwayStation('DB',  'Den Bosch',          new LatLong(51.6905476, 5.2913696));
    public static readonly DH  = new RailwayStation('DH',  'Den Haag',           new LatLong(52.0809271, 4.3222312));
    public static readonly AMR = new RailwayStation('AMR', 'Amersfoort',         new LatLong(52.1530195, 5.3711025));
    public static readonly UTR = new RailwayStation('UTR', 'Utrecht Centraal',   new LatLong(52.0893224, 5.1079804));

    private static readonly ALL = [
        RailwayStation.AMS,
        RailwayStation.DB,
        RailwayStation.DH,
        RailwayStation.AMR,
        RailwayStation.UTR
    ];

    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly location: LatLong
    ) { }

    public toString(): string {
        return `${this.name} (${this.id})`;
    }

    public static closestTo(position: LatLong): RailwayStation {
        return RailwayStation.ALL.reduce((a, b) => a.location.distanceTo(position) < b.location.distanceTo(position) ? a : b);
    }

}
