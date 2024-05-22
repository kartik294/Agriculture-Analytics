import "./AgricultureAnalytics.css";
import React, { useEffect, useState } from "react";
import CropProductionTable from "./CropProductionTable";
import cropData from "../src/data/data.json";
import AverageDataTable from "./AverageDataTable";
import { calculateAverageData, calculateCropData } from "./util/dataAnalysis";

const AgricultureAnalytics: React.FC = () => {
    const [cropMinProduction, setCropMinProduction] = useState<any>([]);
    const [cropMaxProduction, setCropMaxProduction] = useState<any>([]);
    const [cropAverage, setCropAverage] = useState<any>([]);

    useEffect(() => {
        const data = calculateCropData(cropData);
        setCropMinProduction(data.minProduction);
        setCropMaxProduction(data.maxProduction);
        setCropAverage(calculateAverageData(cropData)!);
    }, []);

    return (
        <div className="tableContainer">
            <div className="cropProductionTable">
                <h1>Crop Production Table</h1>
                <CropProductionTable
                    minProduction={cropMinProduction}
                    maxProduction={cropMaxProduction}
                />
            </div>
            <div className="cropProductionTable">
                <h1>Crop Average Table</h1>
                <AverageDataTable averageData={cropAverage} />
            </div>
        </div>
    );
};

export default AgricultureAnalytics;
