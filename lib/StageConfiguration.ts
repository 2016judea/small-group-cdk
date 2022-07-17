export enum Environment {
  PROD = "prod",
  GAMMA = "gamma",
  BETA = "beta",
}

export enum Region {
  US_EAST_1 = "us-east-1",
}

export interface StageConfiguration {
  env: Environment;
  region: Region;
  accountId: string;
}

const prodNa: StageConfiguration = {
  env: Environment.PROD,
  region: Region.US_EAST_1,
  accountId: "616037402112",
};

export const stages: StageConfiguration[] = [prodNa];
