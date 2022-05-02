export interface Company {
  id: number;
  name: string;
  address?: string;
  billingAddress?: string;
  ownerName: string;
  ownerEmail: string;
  createdAt: string;
}

export interface CreateCompanyData {
  name: string;
  address?: string;
  billingAddress?: string;
  ownerName: string;
  ownerEmail: string;
}

export interface UpdateCompanyData {
  id: number;
  data: Partial<CreateCompanyData>;
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
  updateCompany: (data: UpdateCompanyData) => void;
}
