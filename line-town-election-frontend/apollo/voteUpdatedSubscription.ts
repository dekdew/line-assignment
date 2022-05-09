import subscribe from "libs/subscribe";

const VOTE_UPDATED_SUBSCIPTION = `
  subscription {
    voteUpdated {
      id
      votedCount
    }
  }
`;

export const subscribeVoteUpdated = async (...args: any) => {
  return subscribe(VOTE_UPDATED_SUBSCIPTION);
};
