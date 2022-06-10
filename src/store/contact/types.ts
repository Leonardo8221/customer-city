export interface Contact {
  contactId: number;
  contactFirstName: string;
  contactLastName: string;
  contactAssociate: string;
  contactRoles: string[];
  contactCreatedAt: string;
  contactUpdatedAt: string;
}

export interface ContactState {
  loading: boolean;
  error: boolean | string;
  success: boolean | string;
  contacts: Contact[];
}

export interface ContactReturnHook extends ContactState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  getContacts: () => void;
}
