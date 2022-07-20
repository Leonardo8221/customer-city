export interface Tenant {
  tenantId: number;
  tenantName: string;
  tenantAddress?: string;
  tenantBillingAddress?: string;
  tenantIndustry?: string;
  tenantEmployees?: string;
  tenantWebsite?: string;
  tenantCcDomain?: string;
  tenantEmail?: string;
  tenantCreatedAt: string;
  tenantUpdatedAt: string;
  ownerId: number;
  ownerName: string;
  ownerEmail: string;
}

export interface UpdateTenantData {
  tenantId: number;
  data: Partial<Tenant>;
}

export interface TenantState {
  loading: boolean;
  error: string | boolean;
  success: string | boolean;
  tenants: Tenant[];
  tenant: Tenant | null;
}

export interface TenantReturnHook extends TenantState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  getTenants: () => void;
  createTenant: (data: Partial<Tenant>) => void;
  updateTenant: (data: UpdateTenantData) => void;
  getTenant: (id: number) => void;
}
