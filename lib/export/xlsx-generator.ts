import ExcelJS from 'exceljs';

interface SOPData {
    id: string;
    title: string;
    category?: string | null;
    version: string;
    status: string;
    content: string; // JSON string
    industry?: string;
    regulatoryFramework?: string | null;
    effectiveDate?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export async function generateXLSX(sop: SOPData): Promise<Buffer> {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('SOP Checklist');

        // Set column widths
        worksheet.columns = [
            { width: 10 },  // Step #
            { width: 40 },  // Action
            { width: 50 },  // Details
            { width: 12 },  // Completed (✓/✗)
            { width: 30 }   // Notes
        ];

        // Add title
        worksheet.mergeCells('A1:E1');
        const titleCell = worksheet.getCell('A1');
        titleCell.value = sop.title;
        titleCell.font = { size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
        titleCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF4472C4' }
        };
        titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getRow(1).height = 30;

        // Add metadata
        let currentRow = 2;
        worksheet.mergeCells(`A${currentRow}:E${currentRow}`);
        const metadataCell = worksheet.getCell(`A${currentRow}`);
        metadataCell.value = `Document ID: ${sop.id} | Version: ${sop.version} | Status: ${sop.status.toUpperCase()}`;
        metadataCell.font = { size: 10, italic: true };
        metadataCell.alignment = { vertical: 'middle', horizontal: 'center' };

        currentRow++;
        if (sop.category || sop.industry || sop.regulatoryFramework) {
            worksheet.mergeCells(`A${currentRow}:E${currentRow}`);
            const additionalMetadata = worksheet.getCell(`A${currentRow}`);
            const metadataParts = [];
            if (sop.category) metadataParts.push(`Category: ${sop.category}`);
            if (sop.industry) metadataParts.push(`Industry: ${sop.industry}`);
            if (sop.regulatoryFramework) metadataParts.push(`Frameworks: ${sop.regulatoryFramework}`);
            additionalMetadata.value = metadataParts.join(' | ');
            additionalMetadata.font = { size: 10, italic: true };
            additionalMetadata.alignment = { vertical: 'middle', horizontal: 'center' };
            currentRow++;
        }

        // Parse content
        const content = JSON.parse(sop.content);

        // Add blank row
        currentRow++;

        // Add header row
        const headerRow = worksheet.getRow(currentRow);
        headerRow.values = ['Step #', 'Action', 'Details', 'Completed ✓', 'Notes'];
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF70AD47' }
        };
        headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
        headerRow.height = 25;
        currentRow++;

        // Add procedure steps if available
        if (content.procedures && Array.isArray(content.procedures)) {
            content.procedures.forEach((proc: any) => {
                const row = worksheet.getRow(currentRow);
                row.values = [
                    proc.step,
                    proc.action || '',
                    proc.details || '',
                    '', // Empty for checkbox
                    proc.warning ? `⚠ ${proc.warning}` : ''
                ];

                // Style the row
                row.getCell(1).alignment = { vertical: 'top', horizontal: 'center' };
                row.getCell(2).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
                row.getCell(3).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
                row.getCell(4).alignment = { vertical: 'middle', horizontal: 'center' };
                row.getCell(5).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };

                // Highlight warnings
                if (proc.warning) {
                    row.getCell(5).font = { color: { argb: 'FFFF0000' } };
                }

                // Add borders
                [1, 2, 3, 4, 5].forEach(col => {
                    row.getCell(col).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                });

                row.height = Math.max(20, Math.ceil((proc.details?.length || 50) / 50) * 15);
                currentRow++;
            });
        }

        // Add blank row
        currentRow++;

        // Add additional sections
        if (content.safetyNotes && content.safetyNotes.length > 0) {
            worksheet.mergeCells(`A${currentRow}:E${currentRow}`);
            const safetyHeader = worksheet.getCell(`A${currentRow}`);
            safetyHeader.value = 'SAFETY NOTES';
            safetyHeader.font = { bold: true, size: 12 };
            safetyHeader.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFFEB9C' }
            };
            currentRow++;

            content.safetyNotes.forEach((note: string) => {
                worksheet.mergeCells(`A${currentRow}:E${currentRow}`);
                const noteCell = worksheet.getCell(`A${currentRow}`);
                noteCell.value = `• ${note}`;
                noteCell.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
                currentRow++;
            });
            currentRow++;
        }

        // Add acceptance criteria
        if (content.acceptanceCriteria && content.acceptanceCriteria.length > 0) {
            worksheet.mergeCells(`A${currentRow}:E${currentRow}`);
            const criteriaHeader = worksheet.getCell(`A${currentRow}`);
            criteriaHeader.value = 'ACCEPTANCE CRITERIA';
            criteriaHeader.font = { bold: true, size: 12 };
            criteriaHeader.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFD9E1F2' }
            };
            currentRow++;

            content.acceptanceCriteria.forEach((criteria: string) => {
                worksheet.mergeCells(`A${currentRow}:E${currentRow}`);
                const criteriaCell = worksheet.getCell(`A${currentRow}`);
                criteriaCell.value = `• ${criteria}`;
                criteriaCell.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
                currentRow++;
            });
        }

        // Generate buffer
        const buffer = await workbook.xlsx.writeBuffer();
        return Buffer.from(buffer);
    } catch (error) {
        console.error('Error generating XLSX:', error);
        throw new Error('Failed to generate Excel document');
    }
}
