import {
    Document,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
    Table,
    TableCell,
    TableRow,
    WidthType,
    BorderStyle,
    Packer
} from 'docx';

interface SOPData {
    id: string;
    title: string;
    category?: string | null;
    version: string;
    status: string;
    content: string; // JSON string
    industry?: string;
    language?: string;
    regulatoryFramework?: string | null;
    effectiveDate?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export async function generateDOCX(sop: SOPData): Promise<Buffer> {
    try {
        // Parse the content (could be Tiptap JSON or SOPContent JSON)
        const content = JSON.parse(sop.content);

        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    // Title
                    new Paragraph({
                        text: sop.title,
                        heading: HeadingLevel.HEADING_1,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 400 }
                    }),

                    // Metadata Table
                    new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        rows: [
                            createMetadataRow('Document ID:', sop.id),
                            createMetadataRow('Version:', sop.version),
                            createMetadataRow('Status:', sop.status.toUpperCase()),
                            ...(sop.category ? [createMetadataRow('Category:', sop.category)] : []),
                            ...(sop.industry ? [createMetadataRow('Industry:', sop.industry)] : []),
                            ...(sop.regulatoryFramework ? [createMetadataRow('Regulatory Framework:', sop.regulatoryFramework)] : []),
                            ...(sop.effectiveDate ? [createMetadataRow('Effective Date:', new Date(sop.effectiveDate).toLocaleDateString())] : []),
                            createMetadataRow('Created:', new Date(sop.createdAt).toLocaleDateString()),
                            createMetadataRow('Last Updated:', new Date(sop.updatedAt).toLocaleDateString())
                        ],
                        margins: {
                            top: 100,
                            bottom: 100,
                            left: 100,
                            right: 100
                        }
                    }),

                    // Spacing
                    new Paragraph({ text: '', spacing: { after: 400 } }),

                    // Content sections
                    ...generateContentSections(content)
                ]
            }]
        });

        const buffer = await Packer.toBuffer(doc);
        return buffer;
    } catch (error) {
        console.error('Error generating DOCX:', error);
        throw new Error('Failed to generate Word document');
    }
}

function createMetadataRow(label: string, value: string): TableRow {
    return new TableRow({
        children: [
            new TableCell({
                children: [new Paragraph({
                    children: [new TextRun({ text: label, bold: true })]
                })],
                width: { size: 30, type: WidthType.PERCENTAGE },
                borders: {
                    top: { style: BorderStyle.SINGLE, size: 1 },
                    bottom: { style: BorderStyle.SINGLE, size: 1 },
                    left: { style: BorderStyle.SINGLE, size: 1 },
                    right: { style: BorderStyle.SINGLE, size: 1 }
                }
            }),
            new TableCell({
                children: [new Paragraph({ text: value })],
                width: { size: 70, type: WidthType.PERCENTAGE },
                borders: {
                    top: { style: BorderStyle.SINGLE, size: 1 },
                    bottom: { style: BorderStyle.SINGLE, size: 1 },
                    left: { style: BorderStyle.SINGLE, size: 1 },
                    right: { style: BorderStyle.SINGLE, size: 1 }
                }
            })
        ]
    });
}

function generateContentSections(content: any): Paragraph[] {
    const paragraphs: Paragraph[] = [];

    // Check if content has the SOPContent structure
    if (content.purpose) {
        // Purpose
        paragraphs.push(
            new Paragraph({
                text: '1. PURPOSE',
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 400, after: 200 }
            }),
            new Paragraph({
                text: content.purpose,
                spacing: { after: 300 }
            })
        );

        // Scope
        if (content.scope) {
            paragraphs.push(
                new Paragraph({
                    text: '2. SCOPE',
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 400, after: 200 }
                }),
                new Paragraph({
                    text: content.scope,
                    spacing: { after: 300 }
                })
            );
        }

        // Responsibilities
        if (content.responsibilities && content.responsibilities.length > 0) {
            paragraphs.push(
                new Paragraph({
                    text: '3. RESPONSIBILITIES',
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 400, after: 200 }
                })
            );
            content.responsibilities.forEach((resp: string) => {
                paragraphs.push(
                    new Paragraph({
                        text: `• ${resp}`,
                        spacing: { after: 100 },
                        indent: { left: 400 }
                    })
                );
            });
            paragraphs.push(new Paragraph({ text: '', spacing: { after: 300 } }));
        }

        // Procedures
        if (content.procedures && content.procedures.length > 0) {
            paragraphs.push(
                new Paragraph({
                    text: '4. PROCEDURES',
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 400, after: 200 }
                })
            );
            content.procedures.forEach((proc: any) => {
                paragraphs.push(
                    new Paragraph({
                        children: [
                            new TextRun({ text: `Step ${proc.step}: ${proc.action}`, bold: true })
                        ],
                        spacing: { before: 200, after: 100 }
                    })
                );
                if (proc.details) {
                    paragraphs.push(
                        new Paragraph({
                            text: proc.details,
                            indent: { left: 400 },
                            spacing: { after: 100 }
                        })
                    );
                }
                if (proc.warning) {
                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({ text: '⚠ WARNING: ', bold: true, color: 'FF0000' }),
                                new TextRun({ text: proc.warning, color: 'FF0000' })
                            ],
                            indent: { left: 400 },
                            spacing: { after: 200 }
                        })
                    );
                }
            });
            paragraphs.push(new Paragraph({ text: '', spacing: { after: 300 } }));
        }

        // Safety Notes
        if (content.safetyNotes && content.safetyNotes.length > 0) {
            paragraphs.push(
                new Paragraph({
                    text: '5. SAFETY NOTES',
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 400, after: 200 }
                })
            );
            content.safetyNotes.forEach((note: string) => {
                paragraphs.push(
                    new Paragraph({
                        text: `• ${note}`,
                        spacing: { after: 100 },
                        indent: { left: 400 }
                    })
                );
            });
            paragraphs.push(new Paragraph({ text: '', spacing: { after: 300 } }));
        }

        // References
        if (content.references && content.references.length > 0) {
            paragraphs.push(
                new Paragraph({
                    text: '6. REFERENCES',
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 400, after: 200 }
                })
            );
            content.references.forEach((ref: string) => {
                paragraphs.push(
                    new Paragraph({
                        text: `• ${ref}`,
                        spacing: { after: 100 },
                        indent: { left: 400 }
                    })
                );
            });
            paragraphs.push(new Paragraph({ text: '', spacing: { after: 300 } }));
        }

        // Acceptance Criteria
        if (content.acceptanceCriteria && content.acceptanceCriteria.length > 0) {
            paragraphs.push(
                new Paragraph({
                    text: '7. ACCEPTANCE CRITERIA',
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 400, after: 200 }
                })
            );
            content.acceptanceCriteria.forEach((criteria: string) => {
                paragraphs.push(
                    new Paragraph({
                        text: `• ${criteria}`,
                        spacing: { after: 100 },
                        indent: { left: 400 }
                    })
                );
            });
        }
    } else {
        // Fallback: Try to parse as Tiptap JSON
        paragraphs.push(
            new Paragraph({
                text: 'CONTENT',
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 400, after: 200 }
            }),
            new Paragraph({
                text: JSON.stringify(content, null, 2),
                spacing: { after: 300 }
            })
        );
    }

    return paragraphs;
}
