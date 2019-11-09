import React, { PureComponent } from "react";

import { MyContext } from "../interfaces/MyContext";
import { confirmUserMutation } from "../graphql/user/mutations/confirmUser";
import {
  ConfirmUserMutation,
  ConfirmUserVariables
} from "../generated/apolloComponents";
import redirect from "../lib/redirect";

export default class Confirm extends PureComponent {
  static async getInitialProps({
    query: { token },
    apolloClient,
    ...ctx
  }: MyContext) {
    await apolloClient.mutate<ConfirmUserMutation, ConfirmUserVariables>({
      mutation: confirmUserMutation,
      variables: { token: token as string }
    });

    redirect(ctx, "/login");

    return {};
  }

  render() {
    return <div>"something went wrong"</div>;
  }
}
