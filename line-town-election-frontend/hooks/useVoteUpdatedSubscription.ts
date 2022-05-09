import { useSubscription } from "@apollo/react-hooks";
import { VOTE_UPDATED_SUBSCRIBE } from "apollo/voteUpdatedSubscription";

export const useVoteUpdatedSubscription = () => {
  const { data, loading } = useSubscription(VOTE_UPDATED_SUBSCRIBE);

  return { data, loading };
};
