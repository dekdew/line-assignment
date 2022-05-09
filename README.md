# LINE TOWN Election
This project is an assignment of **LINE Recruitment Day 2022**

![LINE TOWN Election](./images/LINE_TOWN_Election.png)

## Getting Started
Front-end project is in [line-town-election-frontend](./line-town-election-frontend) directory

```bash
cd line-town-election-frontend
```

First, copy .env.example and edit it according to your GraphQL HTTP URI and WS URI.

Install package using Yarn.

```bash
yarn install
```

### How to run on local

```bash
yarn dev
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

---

## Feature

### Candidates List
![candidate_list_sm](./images/candidate_list_sm.png)
*Candidate List sm (< 640px)*

![candidate_list_md](./images/candidate_list_md.png)
*Candidate List md (< 768px)*

![candidate_list_lg](./images/candidate_list_lg.png)
*Candidate List lg (< 1020px)*

![candidate_list_xl](./images/candidate_list_xl.png)
*Candidate List xl (< 1280px)*

### Candidate Card
![candidate_card_hover](./images/candidate_card_hover.gif)
*Candidate Card Hover Animation*

![candidate_card_vote_updated](./images/candidate_card_vote_updated.gif)
*Vote Count Real-time Update*

![candidate_card_result](./images/candidate_card_result.png)
*Candidate Card Vote Result*

### Fallback loading data
![handle_loading](./images/handle_loading.gif)
*Loading Data*

### Handle fetch data error
![handle_loading](./images/handle_error.png)
*Fetch Data Error*

### Vote Modal
- Vote modal

    I added the selected candidate detail for understanding which one user is going to vote to.

    Vote button will be disabled if ID input is empty or not complete.

![modal_vote](./images/modal_vote.png)
*Vote Modal*

- Handle invalid national ID

    If user inputs an invalid ID. Input field will show an error message.

![handle_invalid_id](./images/handle_invalid_id.gif)
*Handle Invalid National ID*

- Vote success modal

    I added the response for voted successful.

![modal_vote_success](./images/modal_vote_success.png)
*Vote Success Modal*

- Handle vote fail

    I added this modal to handle when vote is error.

![modal_vote_fail](./images/modal_vote_fail.png)
*Vote Fail Modal*

- Voted modal

    I added a **Not you?** button to handle cases of different users using the same device to vote.

    After clicking this button, the authToken will clear, then open the vote modal for voting.

![modal_already_vote](./images/modal_already_vote.png)
*Already Vote Modal*

### Vote Result

I added an **alert message** to notify that the vote is closed.

I added a **ranking chart** to visualize the vote result.

![result_animation](./images/result_animation.gif)
*Vote Result Animation*

![result_sm](./images/result_sm.png)
*Vote Result sm (< 640px)*

![result_md](./images/result_md.png)
*Vote Result md (< 768px)*

![result_lg](./images/result_lg.png)
*Vote Result lg (< 1024px)*

![result_xl](./images/result_xl.png)
*Vote Result xl (< 1280px)*

---

## Back-end
I added **open status query** for check vote status.
```go
// election-api-main/graph/schema.resolvers.go

func (r *queryResolver) Open(ctx context.Context) (bool, error) {
	stringCmd := r.Cache.Get("e:current:active")
	active, err := stringCmd.Result()
	if err != nil && err.Error() != "redis: nil" {
		return false, err
	}
	if active != "" {

		return true, nil
	}
	return false, nil
}
```

```graphql
# election-api-main/schema.graphql

type Query {
    # ...
    open: Boolean!
}
```

*Note: This is my first time with **golang**. My code might not be best practice.*

---

## Author
### Passawit Riewthong

email: [passawit1999@gmail.com](mailto:passawit1999@gmail.com)

tel: [+66 9 1450 1330](tel:+66914591339)