import { Component, Prop, Vue, Watch, Ref } from 'vue-property-decorator';
import { Point as PointDto, Route } from '@/dto/Route';
import Map from 'ol/Map';
import { Fill, Stroke, Style } from 'ol/style';
import Point from 'ol/geom/Point';
import CircleStyle from 'ol/style/Circle';
import Text from 'ol/style/Text';
import LineString from 'ol/geom/LineString';
import View from 'ol/View';
import Feature from 'ol/Feature';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import XYZ from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import { Color } from '@/models/Color';
import Attribution from 'ol/control/Attribution';
import { Icon } from '@/models/Icon';
import 'ol/ol.css';

@Component
export default class RouteMap extends Vue {

    @Prop()
    lock: boolean;

    @Prop()
    route: Route;

    @Prop()
    highlightIndex: number;

    @Ref('map-bounding-box')
    readonly mapBoundingBox: HTMLDivElement;

    private routeSource: VectorSource = new VectorSource({});
    private highlightPointSource: VectorSource = new VectorSource({});

    private map: Map;
    private observer: ResizeObserver;

    private readonly padding = 40;
    private readonly lineWidth = 3;
    private readonly outlineWidth = 1;

    @Watch('route', {immediate: true})
    onRouteChanged(): void {
        this.routeSource.clear();

        if (this.route) {
            this.recreateMap();
            this.setPoints(this.route.points);
        }
    }

    @Watch('highlightIndex')
    onHighlightIndexChanged(): void {
        this.highlightPointSource.clear();

        if (this.highlightIndex !== null) {
            const point = this.route.points[this.highlightIndex];
            const coords = [point.position.longitude, point.position.latitude];
            const feature = new Feature({
                geometry: new Point(coords).transform('EPSG:4326', 'EPSG:3857'),
            });
            feature.setStyle(this.highlightPointStyle());
            this.highlightPointSource.addFeature(feature);
        }
    }

    mounted(): void {
        this.observer = new ResizeObserver(() => {
            this.recreateMap();
        });
        this.observer.observe(this.mapBoundingBox);
    }

    beforeDestory(): void {
        this.observer.unobserve(this.mapBoundingBox);
    }

    private recreateMap(): void {
        if (this.map) {
            this.map.setTarget(null);
        }

        this.map = new Map({
            target: this.route.uuid,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        attributions: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        url: 'https://a.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png',
                    }),
                }),
                new VectorLayer({
                    source: this.routeSource,
                    style: [
                        new Style({
                            stroke: new Stroke({
                                color: '#fff',
                                width: this.lineWidth + this.outlineWidth,
                            }),
                        }),
                        new Style({
                            stroke: new Stroke({
                                color: Color.Primary,
                                width: this.lineWidth,
                            }),
                        }),
                    ],
                }),
                new VectorLayer({
                    source: this.highlightPointSource,
                }),
            ],
            view: new View({
                center: [0, 0],
                zoom: 0,
                maxZoom: 18,
            }),
            controls: [
                new Attribution(),
            ],
            interactions: this.lock ? [] : undefined,
        });

        this.fitMapToRoute();
    }

    private setPoints(points: PointDto[]): void {
        const coords = points.map(
            point => [point.position.longitude, point.position.latitude],
        );

        const feature = new Feature({
            geometry: new LineString(coords).transform('EPSG:4326', 'EPSG:3857'),
        });
        this.routeSource.addFeature(feature);

        const startFeature = new Feature({
            geometry: new Point(coords[0]).transform('EPSG:4326', 'EPSG:3857'),
        });
        startFeature.setStyle(this.pointStyle(Icon.MapMarker, Color.Primary));
        this.routeSource.addFeature(startFeature);

        const endFeature = new Feature({
            geometry: new Point(coords[coords.length - 1]).transform('EPSG:4326', 'EPSG:3857'),
        });
        endFeature.setStyle(this.pointStyle(Icon.CheckeredFlag, Color.Secondary));
        this.routeSource.addFeature(endFeature);

        this.fitMapToRoute();
    }

    private fitMapToRoute(): void {
        const features = this.routeSource.getFeatures();

        if (this.map && features && features.length > 0) {
            this.map.getView().fit(features[0].getGeometry(), {
                padding: [
                    this.padding,
                    this.padding,
                    this.padding,
                    this.padding,
                ],
            });
        }
    }

    private highlightPointStyle(): Style[] {
        return [
            new Style({
                image: new CircleStyle({
                    radius: 5,
                    fill: new Fill({
                        color: Color.Primary,
                    }),
                }),
            }),
        ];
    }

    private pointStyle(icon: string, color: string): Style[] {
        return [
            new Style({
                image: new CircleStyle({
                    radius: 10,
                    fill: new Fill({
                        color: color,
                    }),
                }),
                text: new Text({
                    text: icon,
                    font: '900 12px "Font Awesome 5 Free"',
                    fill: new Fill({
                        color: '#fff',
                    }),
                    stroke: new Stroke({color: '#fff', width: 1}),
                    textAlign: 'center',
                    textBaseline: 'bottom',
                    offsetY: 7,
                }),
            }),
        ];
    }

}
