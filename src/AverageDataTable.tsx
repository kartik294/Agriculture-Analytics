import React from "react";
import { Table } from "@mantine/core";

interface CropAverageTypes {
    cropName: string;
    averageYield: number;
    averageCultivation: number;
}

interface AverageDataTableProps {
    averageData: CropAverageTypes[];
}

const AverageDataTable: React.FC<AverageDataTableProps> = ({ averageData }) => {
    // Convert data into table rows
    const rows = averageData.map(
        ({ cropName, averageYield, averageCultivation }, index) => (
            <Table.Tr key={index}>
                <Table.Td>{cropName}</Table.Td>
                <Table.Td>{averageYield.toFixed(3)}</Table.Td>
                <Table.Td>{averageCultivation.toFixed(3)}</Table.Td>
            </Table.Tr>
        )
    );

    return (
        <Table.ScrollContainer minWidth={100} type="native">
            <Table
                stickyHeader
                striped
                highlightOnHover
                withTableBorder
                withColumnBorders
            >
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Crop Name</Table.Th>
                        <Table.Th>
                            Average Yield of the Crop between 1950-2020
                        </Table.Th>
                        <Table.Th>
                            Average Cultivation Area of the Crop between
                            1950-2020
                        </Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
};

export default AverageDataTable;
