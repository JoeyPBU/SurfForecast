interface HourData {
    time: string;
    [key: string]: any;
}

interface Data {
    meta?: {
        lat?: number;
        lng?: number;
    };
    hours: HourData[];
}

interface MetaData {
    lat: number | null;
    lng: number | null;
}

interface ProcessedHour {
    time: string;
    [key: string]: { ad: number | null } | string;
}

interface OutputData {
    hours: ProcessedHour[];
    meta?: MetaData;
}

/* Takes in the raw data from each json as passed
Returns data where all values are averaged to key ad */
export default function dataDecider(data: Data): OutputData | { hours: ProcessedHour[] } {
    if (!data || !Array.isArray(data.hours) || data.hours.length === 0) {
        console.error("No data available to process");
        return { hours: [] };
    }

    const outputData: OutputData = {
        hours: []
    };

    let lat = data.meta?.lat || null;
    let lng = data.meta?.lng || null;

    const keys = [
        "airTemperature", 
        "cloudCover", 
        "precipitation", 
        "swellDirection", 
        "swellHeight", 
        "swellPeriod", 
        "waveHeight", 
        "windDirection", 
        "windSpeed",
        "tideLevel"
    ];

    /* returns the average of the data values*/
    const calculateAverage = (values: number[]): number => {
        const sum = values.reduce((acc, value) => acc + value, 0);
        return sum / values.length;
    };

    /* Returns the mode of the data values*/
    const calculateMode = (values: number[]): { mode: number | null, count: number } => {
        const frequency: { [key: number]: number } = {};
        let maxFreq = 0;
        let mode: number | null = null;

        values.forEach(value => {
            if (frequency[value]) {
                frequency[value]++;
            } else {
                frequency[value] = 1;
            }

            if (frequency[value] > maxFreq) {
                maxFreq = frequency[value];
                mode = value;
            }
        });

        return { mode, count: maxFreq };
    };

    /* For each hour, for each key, decide wether a mode or average is more appropriate
       Handle average/mode
       push the new data
       Ensure the meta keeps the lat and lng*/
    data.hours.forEach(hour => {
        const processedHour: ProcessedHour = {
            time: hour.time
        };

        keys.forEach(key => {
            if (hour[key] && typeof hour[key] === 'object') {
                const values: number[] = [];

                for (const value of Object.values(hour[key])) {
                    if (typeof value === 'number') {
                        values.push(value);
                    }
                }

                if (values.length > 0) {
                    const { mode, count } = calculateMode(values);
                    const isModeCommon = count > Math.floor(values.length / 2);
                    
                    processedHour[key] = {
                        ad: isModeCommon ? mode : calculateAverage(values)
                    };
                } else {
                    processedHour[key] = { ad: null };
                }
            } else {
                processedHour[key] = { ad: null };
            }
        });

        outputData.hours.push(processedHour);
    });

    if (lat !== null && lng !== null) {
        outputData.meta = {
            lat,
            lng
        };
    }

    return outputData;
}
