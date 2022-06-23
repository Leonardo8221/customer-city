export const DEAL_STAGE_OPTIONS = [
  { label: 'Prospect', value: 'prospect' },
  { label: 'Engagement', value: 'engagement' },
  { label: 'Discovery', value: 'discovery' },
  { label: 'Negotiation', value: 'negotiation' },
  { label: 'Closed Won', value: 'closed_won' },
  { label: 'Closed Lost', value: 'closed_lost' },
];
export interface Deal {
  dealId: number;
  dealName: string;
  dealAccountName: string;
  dealDescription: string;
  dealAmount: number;
  dealCampaignName: string;
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
  deleteDeal: (id: number) => void;
}
