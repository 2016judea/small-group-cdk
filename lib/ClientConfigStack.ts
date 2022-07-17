import { Construct } from "constructs";
import { Stack } from "monocdk";
import { IdentityPool } from "monocdk/aws-cognito-identitypool";
import * as iam from "monocdk/aws-iam";
import { Secret } from "monocdk/aws-secretsmanager";
import { StageConfiguration } from "./StageConfiguration";

interface ClientConfigStackProps {
  stageConfigurtation: StageConfiguration;
}

export class ClientConfigStack extends Stack {
  public identityPool: IdentityPool;

  constructor(scope: Construct, id: string, props: ClientConfigStackProps) {
    super(scope, id);

    const stage = props.stageConfigurtation;

    const smallGroupUserSecret = new Secret(this, `SmallGroupMobileSecret`, {
      secretName: "SmallGroupMobileUserSecret",
    });

    const smallGroupMobileUser = new iam.User(this, `SmallGroupMobileUser`, {
      userName: "SmallGroupMobileUser",
      passwordResetRequired: false,
      password: smallGroupUserSecret.secretValue,
    });

    const smallGroupIdentityPool = new IdentityPool(
      this,
      `SmallGroupIdentityPool`,
      {
        identityPoolName: "SmallGroupIdentityPool",
        allowUnauthenticatedIdentities: true,
      }
    );
    this.identityPool = smallGroupIdentityPool;
  }
}
