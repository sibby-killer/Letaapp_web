import { supabase } from '@/lib/supabase'

interface Location {
    latitude: number
    longitude: number
}

export class DispatchService {
    /**
     * Finds the nearest available rider to the store location.
     * Uses the Greedy Algorithm approach (minimizing distance).
     */
    static async findNearestRider(storeLocation: Location) {
        try {
            // In a real scenario, we use PostGIS 'ST_Distance'
            // rpc('find_nearest_rider', { lat, long })
            const { data: riders, error } = await supabase
                .from('rider_metrics') // Assuming a view or table with location
                .select(`
          id,
          rider_id,
          is_online,
          current_latitude,
          current_longitude
        `)
                .eq('is_online', true)

            if (error) throw error

            if (!riders || riders.length === 0) return null

            // GREEDY ALGORITHM: Calculate distance and sort by nearest
            const sortedRiders = riders.map(rider => {
                const distance = this.calculateDistance(
                    storeLocation.latitude,
                    storeLocation.longitude,
                    rider.current_latitude,
                    rider.current_longitude
                )
                return { ...rider, distance }
            }).sort((a, b) => a.distance - b.distance)

            // Return the winner (closest rider)
            return sortedRiders[0]

        } catch (err) {
            console.error("Dispatch Error:", err)
            return null
        }
    }

    /**
     * Haversine formula to calculate distance between two points in km
     */
    private static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371 // Radius of the earth in km
        const dLat = this.deg2rad(lat2 - lat1)
        const dLon = this.deg2rad(lon2 - lon1)
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return R * c // Distance in km
    }

    private static deg2rad(deg: number): number {
        return deg * (Math.PI / 180)
    }
}
