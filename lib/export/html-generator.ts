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

export function generateHTML(sop: SOPData): string {
    const content = JSON.parse(sop.content);

    const html = `<!DOCTYPE html>
<html lang="${sop.language || 'en'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(sop.title)}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 20px;
            background-color: #f5f5f5;
        }

        .container {
            background-color: white;
            padding: 60px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }

        .header {
            text-align: center;
            border-bottom: 3px solid #2c3e50;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }

        h1 {
            color: #2c3e50;
            font-size: 32px;
            margin-bottom: 20px;
        }

        .metadata {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 30px;
            font-size: 14px;
        }

        .metadata-item {
            display: flex;
        }

        .metadata-label {
            font-weight: bold;
            min-width: 140px;
            color: #555;
        }

        .metadata-value {
            color: #333;
        }

        .section {
            margin-bottom: 30px;
        }

        h2 {
            color: #2c3e50;
            font-size: 22px;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }

        .section-content {
            padding-left: 20px;
        }

        .responsibility-list, .safety-list, .reference-list, .criteria-list {
            list-style-type: none;
            padding-left: 0;
        }

        .responsibility-list li, .safety-list li, .reference-list li, .criteria-list li {
            padding: 8px 0;
            padding-left: 25px;
            position: relative;
        }

        .responsibility-list li:before, .safety-list li:before, .reference-list li:before, .criteria-list li:before {
            content: "•";
            color: #3498db;
            font-weight: bold;
            position: absolute;
            left: 0;
        }

        .procedure-step {
            margin-bottom: 25px;
            padding: 20px;
            background-color: #f8f9fa;
            border-left: 4px solid #3498db;
            border-radius: 4px;
        }

        .step-header {
            font-size: 18px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 10px;
        }

        .step-details {
            color: #555;
            line-height: 1.8;
            margin-bottom: 10px;
        }

        .step-warning {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 12px;
            margin-top: 10px;
            border-radius: 4px;
        }

        .step-warning strong {
            color: #856404;
        }

        .warning-icon {
            font-size: 18px;
            margin-right: 8px;
        }

        .safety-section {
            background-color: #fff3cd;
            padding: 20px;
            border-radius: 5px;
            border-left: 4px solid #ffc107;
        }

        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .status-draft {
            background-color: #e9ecef;
            color: #6c757d;
        }

        .status-approved {
            background-color: #d4edda;
            color: #155724;
        }

        .status-archived {
            background-color: #d1ecf1;
            color: #0c5460;
        }

        @media print {
            body {
                background-color: white;
                padding: 0;
            }

            .container {
                box-shadow: none;
                padding: 20px;
            }

            .procedure-step {
                page-break-inside: avoid;
            }

            .section {
                page-break-inside: avoid;
            }
        }

        @media (max-width: 768px) {
            .container {
                padding: 30px 20px;
            }

            .metadata {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${escapeHtml(sop.title)}</h1>
            <span class="status-badge status-${sop.status}">${sop.status.toUpperCase()}</span>
        </div>

        <div class="metadata">
            <div class="metadata-item">
                <span class="metadata-label">Document ID:</span>
                <span class="metadata-value">${escapeHtml(sop.id)}</span>
            </div>
            <div class="metadata-item">
                <span class="metadata-label">Version:</span>
                <span class="metadata-value">${escapeHtml(sop.version)}</span>
            </div>
            ${sop.category ? `
            <div class="metadata-item">
                <span class="metadata-label">Category:</span>
                <span class="metadata-value">${escapeHtml(sop.category)}</span>
            </div>
            ` : ''}
            ${sop.industry ? `
            <div class="metadata-item">
                <span class="metadata-label">Industry:</span>
                <span class="metadata-value">${escapeHtml(sop.industry)}</span>
            </div>
            ` : ''}
            ${sop.regulatoryFramework ? `
            <div class="metadata-item">
                <span class="metadata-label">Regulatory Framework:</span>
                <span class="metadata-value">${escapeHtml(sop.regulatoryFramework)}</span>
            </div>
            ` : ''}
            ${sop.effectiveDate ? `
            <div class="metadata-item">
                <span class="metadata-label">Effective Date:</span>
                <span class="metadata-value">${new Date(sop.effectiveDate).toLocaleDateString()}</span>
            </div>
            ` : ''}
            <div class="metadata-item">
                <span class="metadata-label">Created:</span>
                <span class="metadata-value">${new Date(sop.createdAt).toLocaleDateString()}</span>
            </div>
            <div class="metadata-item">
                <span class="metadata-label">Last Updated:</span>
                <span class="metadata-value">${new Date(sop.updatedAt).toLocaleDateString()}</span>
            </div>
        </div>

        ${generateContentSections(content)}
    </div>
</body>
</html>`;

    return html;
}

function generateContentSections(content: any): string {
    let sections = '';

    if (content.purpose) {
        sections += `
        <div class="section">
            <h2>1. PURPOSE</h2>
            <div class="section-content">
                <p>${escapeHtml(content.purpose)}</p>
            </div>
        </div>`;
    }

    if (content.scope) {
        sections += `
        <div class="section">
            <h2>2. SCOPE</h2>
            <div class="section-content">
                <p>${escapeHtml(content.scope)}</p>
            </div>
        </div>`;
    }

    if (content.responsibilities && content.responsibilities.length > 0) {
        sections += `
        <div class="section">
            <h2>3. RESPONSIBILITIES</h2>
            <div class="section-content">
                <ul class="responsibility-list">
                    ${content.responsibilities.map((resp: string) => `<li>${escapeHtml(resp)}</li>`).join('')}
                </ul>
            </div>
        </div>`;
    }

    if (content.procedures && content.procedures.length > 0) {
        sections += `
        <div class="section">
            <h2>4. PROCEDURES</h2>
            <div class="section-content">`;

        content.procedures.forEach((proc: any) => {
            sections += `
                <div class="procedure-step">
                    <div class="step-header">Step ${proc.step}: ${escapeHtml(proc.action)}</div>
                    ${proc.details ? `<div class="step-details">${escapeHtml(proc.details)}</div>` : ''}
                    ${proc.warning ? `
                    <div class="step-warning">
                        <span class="warning-icon">⚠</span>
                        <strong>WARNING:</strong> ${escapeHtml(proc.warning)}
                    </div>
                    ` : ''}
                </div>`;
        });

        sections += `
            </div>
        </div>`;
    }

    if (content.safetyNotes && content.safetyNotes.length > 0) {
        sections += `
        <div class="section">
            <h2>5. SAFETY NOTES</h2>
            <div class="section-content safety-section">
                <ul class="safety-list">
                    ${content.safetyNotes.map((note: string) => `<li>${escapeHtml(note)}</li>`).join('')}
                </ul>
            </div>
        </div>`;
    }

    if (content.references && content.references.length > 0) {
        sections += `
        <div class="section">
            <h2>6. REFERENCES</h2>
            <div class="section-content">
                <ul class="reference-list">
                    ${content.references.map((ref: string) => `<li>${escapeHtml(ref)}</li>`).join('')}
                </ul>
            </div>
        </div>`;
    }

    if (content.acceptanceCriteria && content.acceptanceCriteria.length > 0) {
        sections += `
        <div class="section">
            <h2>7. ACCEPTANCE CRITERIA</h2>
            <div class="section-content">
                <ul class="criteria-list">
                    ${content.acceptanceCriteria.map((criteria: string) => `<li>${escapeHtml(criteria)}</li>`).join('')}
                </ul>
            </div>
        </div>`;
    }

    return sections;
}

function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}
