// Types
interface CropData {
    [key: string]: {
        production: number;
        crop: string;
    };
}
interface CropEntry {
    Year: string;
    "Area Under Cultivation (UOM:Ha(Hectares))": number | string;
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
    "Crop Name": string;
}

interface CropAverageTypes {
    cropName: string;
    averageYield: number;
    averageCultivation: number;
}

// variables for Store maximum and minimum production data
const maxProduction: CropData = {};
const minProduction: CropData = {};

const cropDataMap: Record<
    string,
    { totalArea: number; totalYield: number; count: number }
> = {};

export const calculateCropData = (cropData: CropEntry[]) => {
    cropData.forEach((entry: any) => {
        // Extracting data from cropData
        const year = entry.Year;
        const production = entry["Crop Production (UOM:t(Tonnes))"];
        const cropName = entry["Crop Name"];

        if (typeof production === "number") {
            if (
                !(year in maxProduction) ||
                production > maxProduction[year].production
            ) {
                maxProduction[year] = { production, crop: cropName };
            }

            if (
                !(year in minProduction) ||
                production < minProduction[year].production
            ) {
                minProduction[year] = { production, crop: cropName };
            }
        }
    });

    return { maxProduction, minProduction };
};

export const calculateAverageData = (
    cropData: CropEntry[]
): CropAverageTypes[] => {
    cropData.forEach((entry: CropEntry) => {
        // Extracting data
        const year = parseInt(entry.Year.match(/\d+/)?.[0] || ""); // Extract year from string
        const area =
            typeof entry["Area Under Cultivation (UOM:Ha(Hectares))"] ===
            "number"
                ? entry["Area Under Cultivation (UOM:Ha(Hectares))"]
                : 0;
        const yieldCrop =
            typeof entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] ===
            "number"
                ? entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]
                : 0;
        const cropName = entry["Crop Name"];

        // Check if year is between 1950 and 2020
        if (!isNaN(year) && year >= 1950 && year <= 2020) {
            if (!cropDataMap[cropName]) {
                cropDataMap[cropName] = {
                    totalArea: 0,
                    totalYield: 0,
                    count: 0,
                };
            }
            cropDataMap[cropName].totalArea += area;
            cropDataMap[cropName].totalYield += yieldCrop;
            cropDataMap[cropName].count++;
        }
    });

    // Calculate averages for each crop
    return Object.keys(cropDataMap).map((cropName) => ({
        cropName,
        averageYield:
            cropDataMap[cropName].totalYield / cropDataMap[cropName].count,
        averageCultivation:
            cropDataMap[cropName].totalArea / cropDataMap[cropName].count,
    }));
};
