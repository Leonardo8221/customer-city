export interface Deal {
  dealId: number;
  dealName: string;
  dealAccountName: string;
  dealDescription: string;
  dealAmount: number;
  dealCampanignName: string;
  dealCloseDate: Date;
  dealContactName: string;
  dealForecastCategory: string;
  dealStage: string;
  dealType: string;
  dealOwner: string;
  dealPipelineName: string;
  dealTouchPoint: string;
  dealCreatedAt: Date;
  dealUpdatedAt: Date;
  dealModifiedBy: number;
}

export interface DealState {
  loading: boolean;
  error: boolean | string;
  success: boolean | string;
  deals: Deal[];
  deal: Deal | null;
}

export interface DealReturnHook extends DealState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  getDeals: () => void;
  getDeal: (id: number) => void;
}
