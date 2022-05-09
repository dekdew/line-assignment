export interface ICandidate {
  id: string;
  name: string;
  policy: string;
  bioLink: string;
  imageURL: string;
  votedCount: number;
  dob: string;
}

export interface IVoteUpdated {
  voteUpdated: IVote;
}

export interface IVote {
  id: string;
  votedCount: number;
}
