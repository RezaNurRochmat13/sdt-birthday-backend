import fetch from 'node-fetch'
import { find as findTimeZone } from 'geo-tz'

type Coordinates = {
    latitude: number,
    longitude: number
}

export default function useTimezone() {
    async function getCoordinates(location: string): Promise<Coordinates> {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&addressdetails=1`;
  
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch coordinates: ${response.statusText}`);
            }

            const data: any = await response.json();

            if (data.length === 0) {
                throw new Error('Location not found');
            }

            const { lat, lon } = data[0];

            return {
                latitude: parseFloat(lat),
                longitude: parseFloat(lon),
            };
        } catch (error) {
            throw new Error(`Error fetching coordinates: ${(error as Error).message}`);
        }
    }

    async function getTimezone(location: string): Promise<string> {
        try {
            const { latitude, longitude } = await getCoordinates(location);
            const timezones = findTimeZone(latitude, longitude);

            return timezones[0]; // Return first matched timezone
        } catch (error) {
            console.error(`Error getting timezone: ${(error as Error).message}`);
            return 'UTC'; // Default to UTC on error
        }
    }

    return {
        getTimezone
    }
}
