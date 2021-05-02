import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Position } from '@/dto/Route';
import { Circle as CircleDto } from '@/dto/Circle';
import { PrivacyZone } from '@/dto/PrivacyZone';
import { Color } from '@/models/Color';

import Map from 'ol/Map';
import { Fill, Stroke, Style } from 'ol/style';
import Point from 'ol/geom/Point';
import CircleStyle from 'ol/style/Circle';
import View from 'ol/View';
import Feature from 'ol/Feature';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import XYZ from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import Attribution from 'ol/control/Attribution';
import 'ol/ol.css';
import { transform } from 'ol/proj';
import { circular } from 'ol/geom/Polygon';

@Component
export default class PrivacyZoneMap extends Vue {

    @Prop()
    lock: boolean;

    @Prop()
    zone: PrivacyZone;

    private source: VectorSource = new VectorSource({});
    private map: Map;

    private readonly padding = 10;

    get zoneUUID(): string {
        return this.zone.uuid;
    }

    @Watch('zoneUUID', {immediate: true})
    onZoneUUIDChanged(): void {
        this.recreateMap();
        this.setZone(this.zone);
    }

    @Watch('zone.circle', {immediate: true})
    onCircleChanged(): void {
        this.setZone(this.zone);
    }

    @Watch('zone.position', {immediate: true})
    onPositionChanged(): void {
        this.setZone(this.zone);
    }

    mounted(): void {
        this.recreateMap();
    }

    private recreateMap(): void {
        if (this.map) {
            this.map.setTarget(null);
        }

        this.map = new Map({
            target: this.zone.uuid,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        attributions: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        url: 'https://a.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png',
                    }),
                }),
                new VectorLayer({
                    source: this.source,
                }),
            ],
            view: new View({
                center: transform([16.35618, 48.2093851], 'EPSG:4326', 'EPSG:3857'),
                zoom: 14,
                maxZoom: 18,
            }),
            controls: [
                new Attribution(),
            ],
            interactions: this.lock ? [] : undefined,
        });

        this.map.on('click', event => {
            const lonLat = transform(
                this.map.getCoordinateFromPixel(event.pixel),
                'EPSG:3857',
                'EPSG:4326',
            );

            const position: Position = {
                latitude: lonLat[1],
                longitude: lonLat[0],
            };

            this.$emit('position', position);
        });

        this.fitMap();
    }

    private setZone(zone: PrivacyZone): void {
        this.source.clear();

        if (!zone.position || !zone.circle || !zone.circle.radius || !zone.circle.center) {
            return;
        }

        this.source.addFeature(
            this.createPositionFeature(zone.position),
        );

        this.source.addFeature(
            this.createCircleFeature(zone.circle),
        );

        this.fitMap();
    }

    private createPositionFeature(position: Position): Feature {
        const coords = [position.longitude, position.latitude];

        const feature = new Feature({
            geometry: new Point(coords).transform('EPSG:4326', 'EPSG:3857'),
        });
        feature.setStyle(
            [
                new Style({
                    image: new CircleStyle({
                        radius: 5,
                        fill: new Fill({color: Color.Primary }),
                        stroke: new Stroke({
                            color: '#ffffff',
                            width: 1,
                        }),
                    }),
                }),
            ],
        );
        return feature;
    }

    private createCircleFeature(circle: CircleDto): Feature {
        const coords = [
            circle.center.longitude,
            circle.center.latitude,
        ];

        const feature = new Feature({
            geometry: circular(coords, circle.radius).transform('EPSG:4326', 'EPSG:3857'),
        });
        feature.setStyle(
            [
                new Style({
                    fill: new Fill({
                        color: this.addAlpha(Color.Primary, 0.2),
                    }),
                    stroke: new Stroke({
                        width: 1,
                        color: Color.Primary,
                    }),
                }),
            ],
        );
        return feature;
    }

    private fitMap(): void {
        if (!this.lock) {
            return;
        }

        const features = this.source.getFeatures();

        if (this.map && features && features.length > 0) {
            this.map.getView().fit(
                this.source.getExtent(),
                {
                    padding: [
                        this.padding,
                        this.padding,
                        this.padding,
                        this.padding,
                    ],
                },
            );
        }
    }

    private addAlpha(color: string, opacity: number): string {
        const rescaledOpacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
        return color + rescaledOpacity.toString(16).toUpperCase();
    }
}

