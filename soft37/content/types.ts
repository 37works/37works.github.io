export interface LegalSection {
  /** language code, used as anchor id (en, ja, ko, zh, de, es, fr) */
  id: string;
  /** short badge text, e.g. "EN" */
  badge: string;
  /** human label, e.g. "한국어" */
  label: string;
  /** flag emoji */
  flag: string;
  /** preserved inner HTML of the legal text (contains {APP_NAME} placeholder) */
  html: string;
}

export interface LegalDoc {
  /** document title, e.g. "Privacy Policy" */
  title: string;
  effectiveDate: string;
  developer: string;
  contactEmail: string;
  sections: LegalSection[];
}
