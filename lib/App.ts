import { App } from "monocdk";
import { ClientConfigStack } from "./ClientConfigStack";
import { DataStoreStack } from "./DataStoreStack";
import { stages } from "./StageConfiguration";

const app = new App();

stages.forEach((stage) => {
  const clientConfigStack = new ClientConfigStack(
    app,
    `ClientConfigStack-${stage.env}-${stage.region}`,
    {
      stageConfigurtation: stage,
    }
  );

  const dataStoreStack = new DataStoreStack(
    app,
    `DataStoreStack-${stage.env}-${stage.region}`,
    {
      stageConfigurtation: stage,
      identityPool: clientConfigStack.identityPool,
    }
  );
});
