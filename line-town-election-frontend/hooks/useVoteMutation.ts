import { useMutation } from "@apollo/react-hooks";
import { VOTE_MUTATION } from "apollo/voteMutation";

export const useVoteMutation = () => {
  const [mutation, { data, loading, error }] = useMutation(VOTE_MUTATION);

  const vote = (id: string) => {
    try {
      return mutation({
        variables: {
          id: id,
        },
      });
    } catch (error) {
      // throw error;
    }
  };
  return { vote, mutationResults: { data, loading, error } };
};
