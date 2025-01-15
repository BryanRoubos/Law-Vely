declare module "*.json" {
    const value: any;
    export default value;
  }

  export interface LegislationSummary {
    title: string;
    summaryOfLegislation: string;
    summaryOfSubSections: PerformanceServerTiming;
    timestamp: number;
  }

  export type LegislationSummaries = Record<string, LegislationSummary>;