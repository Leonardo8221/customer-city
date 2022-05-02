export interface Company {
  id: number;
  name: string;
  address?: string;
  billingAddress?: string;
  ownerName: string;
  ownerEmail: string;
  createdAt: Date;
}

export interface CreateCompanyData {
  name: string;
  address?: string;
  billingAddress?: string;
  ownerName: string;
  ownerEmail: string;
}

export interface CompanyState {
  loading: boolean;
  error: string | boolean;
  success: string | boolean;
  companies: Company[];
}

export interface CompanyReturnHook extends CompanyState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  getCompanies: () => void;
  createCompany: (data: CreateCompanyData) => void;
}
