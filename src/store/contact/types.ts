export interface Contact {
  contactId: number;
  contactFirstName: string;
  contactMiddleName: string;
  contactLastName: string;
  contactTitle: string;
  contactAssociate: string;
  contactRole: string;
  contactPrimaryEmail: string;
  contactSecondaryEmail: string;
  contactPhoneNumber: string;
  contactMobileNumber: string;
  contactStage: string;
  contactType: string;
  //address
  contactStreet: string;
  contactState: string;
  contactCity: string;
  contactCountry: string;
  contactCreatedAt: string;
  contactUpdatedAt: string;
}

export interface ContactState {
  loading: boolean;
  error: boolean | string;
  success: boolean | string;
  contacts: Contact[];
  contact: Contact | null;
}

export interface ContactReturnHook extends ContactState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  getContacts: () => void;
  getContact: (id: number) => void;
}
