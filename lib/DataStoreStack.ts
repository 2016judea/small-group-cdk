import { Construct } from "constructs";
import { Stack } from "monocdk";
import { IdentityPool } from "monocdk/aws-cognito-identitypool";
import { Bucket } from "monocdk/aws-s3";
import { StageConfiguration } from "./StageConfiguration";

interface DataStoreStackProps {
  stageConfigurtation: StageConfiguration;
  identityPool: IdentityPool;
}

export class DataStoreStack extends Stack {
  constructor(scope: Construct, id: string, props: DataStoreStackProps) {
    super(scope, id);

    const stage = props.stageConfigurtation;

    const profilesBucket = new Bucket(this, `ProfilesBucket`, {
      bucketName: `small-group-profiles-${stage.env}-${stage.region}`,
      publicReadAccess: false,
    });
    const discussionsBucket = new Bucket(this, `DiscussionsBucket`, {
      bucketName: `small-group-discussions-${stage.env}-${stage.region}`,
      publicReadAccess: false,
    });

    /* Grant unauthenticated users access to the profiles S3 bucket so we can determine
     * if they have an existing profile or not */
    profilesBucket.grantRead(props.identityPool.unauthenticatedRole);

    /* Grant authenticated users access to the profiles and discussions S3 bucket */
    profilesBucket.grantRead(props.identityPool.authenticatedRole);
    discussionsBucket.grantRead(props.identityPool.authenticatedRole);
  }
}
