export interface IndustryTemplate {
  name: string;
  context: string;
  examples: string;
  frameworks: string[];
  specificGuidelines: string;
}

export const industryTemplates: Record<string, IndustryTemplate> = {
  general: {
    name: "General",
    context: "General business operations",
    examples: "standard procedures, process documentation, workflow guidelines",
    frameworks: ["ISO 9001"],
    specificGuidelines: "Follow standard business process documentation practices."
  },
  healthcare: {
    name: "Healthcare",
    context: "Medical facility, patient safety, HIPAA compliance, clinical procedures",
    examples: "medication administration, patient intake, sterilization procedures, infection control",
    frameworks: ["ISO 13485", "FDA 21 CFR Part 11", "HIPAA", "Joint Commission"],
    specificGuidelines: `
- Emphasize patient safety and infection control
- Include detailed safety precautions and contraindications
- Reference medical standards and regulatory requirements
- Include documentation requirements for patient records
- Specify required certifications or training for personnel
- Include emergency response procedures where applicable
    `.trim()
  },
  manufacturing: {
    name: "Manufacturing",
    context: "Production facility, quality control, GMP compliance, assembly operations",
    examples: "assembly procedures, quality checks, equipment calibration, batch processing",
    frameworks: ["ISO 9001", "GMP", "ISO 13485", "Six Sigma"],
    specificGuidelines: `
- Include quality control checkpoints and acceptance criteria
- Specify required tools, equipment, and materials
- Include calibration requirements and frequencies
- Detail inspection procedures and tolerances
- Reference work instructions and technical drawings
- Include rework and non-conformance procedures
    `.trim()
  },
  it: {
    name: "Information Technology",
    context: "IT department, cybersecurity, data management, system administration",
    examples: "server maintenance, backup procedures, incident response, software deployment",
    frameworks: ["ISO 27001", "SOC 2", "NIST Cybersecurity Framework", "ITIL"],
    specificGuidelines: `
- Include security considerations and access controls
- Specify required permissions and authentication methods
- Detail rollback procedures for changes
- Include monitoring and alerting requirements
- Reference security policies and compliance requirements
- Document system dependencies and prerequisites
    `.trim()
  },
  finance: {
    name: "Financial Services",
    context: "Financial institution, compliance, audit requirements, risk management",
    examples: "transaction processing, KYC procedures, risk assessment, fraud detection",
    frameworks: ["SOX", "PCI DSS", "FINRA", "Basel III", "GDPR"],
    specificGuidelines: `
- Emphasize internal controls and segregation of duties
- Include audit trail and documentation requirements
- Detail approval workflows and authorization levels
- Reference regulatory compliance requirements
- Include fraud detection and prevention measures
- Specify data retention and privacy requirements
    `.trim()
  },
  laboratory: {
    name: "Laboratory",
    context: "Testing facility, sample handling, accuracy and precision, scientific procedures",
    examples: "sample analysis, equipment maintenance, calibration procedures, quality assurance",
    frameworks: ["ISO 17025", "CLIA", "GLP", "FDA 21 CFR Part 11"],
    specificGuidelines: `
- Include detailed methodology and validation procedures
- Specify required equipment, reagents, and standards
- Detail calibration and quality control procedures
- Include acceptance criteria and measurement uncertainty
- Reference test methods and analytical procedures
- Document sample handling and chain of custody requirements
    `.trim()
  },
  food: {
    name: "Food & Beverage",
    context: "Food processing, safety standards, HACCP compliance, quality assurance",
    examples: "food preparation, sanitation procedures, allergen control, temperature monitoring",
    frameworks: ["HACCP", "ISO 22000", "FDA Food Safety", "GFSI"],
    specificGuidelines: `
- Emphasize food safety and allergen control
- Include critical control points and monitoring requirements
- Detail cleaning and sanitation procedures
- Specify temperature controls and monitoring frequencies
- Include corrective actions for deviations
- Reference food safety regulations and standards
    `.trim()
  },
  construction: {
    name: "Construction",
    context: "Construction site, safety protocols, building standards, project management",
    examples: "site preparation, safety procedures, equipment operation, quality inspection",
    frameworks: ["OSHA", "ISO 45001", "Building Codes", "LEED"],
    specificGuidelines: `
- Prioritize worker safety and PPE requirements
- Include environmental and site-specific hazards
- Detail equipment safety checks and certifications
- Specify inspection points and quality standards
- Include emergency procedures and first aid
- Reference applicable building codes and permits
    `.trim()
  }
};
