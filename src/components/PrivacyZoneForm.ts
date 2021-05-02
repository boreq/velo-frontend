import { Component, Vue, Prop } from 'vue-property-decorator';
import { Position } from '@/dto/Route';
import { PrivacyZone } from '@/dto/PrivacyZone';

import PrivacyZoneMap from '@/components/PrivacyZoneMap.vue';
import FormInput from '@/components/forms/FormInput.vue';
import FormSlider from '@/components/forms/FormSlider.vue';

import { lengthOfLatitudeDegree, lengthOfLongitudeDegree, clampLatitude, clampLongitude, distance } from '@/geo/geo';

@Component({
    components: {
        PrivacyZoneMap,
        FormInput,
        FormSlider,
    },
})
export default class PrivacyZoneForm extends Vue {

    @Prop()
    value: PrivacyZone;

    radiusSliderLabel(n: number): string {
        return `${n} meters`;
    }

    onName(name: string): void {
        this.value.name = name;
        this.emitZone();
    }

    onRadius(radius: number): void {
        this.value.circle.radius = radius;
        if (!this.positionIsWithinCircle(this.value)) {
            this.randomizeCircleCenter(this.value);
        }
        this.emitZone();
    }

    onMapPosition(position: Position): void {
        this.value.position = position;
        this.randomizeCircleCenter(this.value);
        this.emitZone();
    }

    private emitZone(): void {
        const zone: PrivacyZone = {
            uuid: this.value.uuid,
            name: this.value.name,
            circle: this.value.circle,
            position: this.value.position,
        };

        this.$emit('input', zone);
    }

    private randomizeCircleCenter(zone: PrivacyZone): void {
        const lengthLatitude = lengthOfLatitudeDegree(zone.position.latitude);
        const lengthLongitude = lengthOfLongitudeDegree(zone.position.latitude);

        do {
            const latitudeRadius = zone.circle.radius / lengthLatitude;
            const longitudeRadius = zone.circle.radius / lengthLongitude;

            const latitude = clampLatitude(
                zone.position.latitude - latitudeRadius + (2 * latitudeRadius * Math.random()),
            );
            const longitude = clampLongitude(
                zone.position.longitude - longitudeRadius + (2 * longitudeRadius * Math.random()),
            );

            zone.circle.center = {
                latitude: latitude,
                longitude: longitude,
            };

        } while (!this.positionIsWithinCircle(zone));
    }

    private positionIsWithinCircle(zone: PrivacyZone): boolean {
        const positionMustBeWithinThisRadiusPercentage = 0.9;
        return this.distanceToCircleCenter(zone) < positionMustBeWithinThisRadiusPercentage * zone.circle.radius;
    }

    private distanceToCircleCenter(zone: PrivacyZone): number {
        return distance(
            zone.circle.center.latitude,
            zone.circle.center.longitude,
            zone.position.latitude,
            zone.position.longitude,
        );
    }

}
