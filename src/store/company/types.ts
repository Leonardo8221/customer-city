export interface Company {
  companyId: number;
  companyName: string;
  companyAddress?: string;
  companyBillingAddress?: string;
  companyIndustry?: string;
  companyEmployees?: string;
  companyWebsite?: string;
  companyCcDomain?: string;
  companyEmail?: string;
  companyCreatedAt: string;
  ownerName: string;
  ownerEmail: string;
}

export interface UpdateCompanyData {
  companyId: number;
  data: Partial<Company>;
}

export interface CompanyState {
  loading: boolean;
  error: string | boolean;
  success: string | boolean;
  companies: Company[];
  company: Company | null;
}

export interface CompanyReturnHook extends CompanyState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  getCompanies: () => void;
  createCompany: (data: Partial<Company>) => void;
  updateCompany: (data: UpdateCompanyData) => void;
  deleteCompanies: (ids: number[]) => void;
  getCompany: (id: number) => void;
}
