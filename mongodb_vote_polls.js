db.polls.aggregate([
  {
    $unwind: "$polls"
  },
  {
    $unwind: "$polls.votes"
  },
  {
    $group: {
      _id: {
        user: "$user",
        question: "$polls.question"
      },
     
      maxvotedwith: {
        $max: "$polls.votes.option"
      },
	   count: {
        $sum: 1
      },
      post: {
        $first: "$polls.question"
      }
    }
  },
  {
    $group: {
      _id: "$_id.user",
	  
      polls: {
        $push: {
          count: "$count",
          maxvotedwith: "$maxvotedwith",
          post: "$post",
        }
      },
      user: {
        $first: "$_id.user"
      }
    }
  },
  {
    $sort: {
      "user": 1
    }
  }
])

// Output

// [
//   {
//     "polls": [
//       {
//         "count": 2,
//         "maxvotedwith": "Wind",
//         "post": "Which of the following is an example of a renewable energy source?"
//       },
//       {
//         "count": 2,
//         "maxvotedwith": "Jupiter",
//         "post": "Which of the following is the largest planet in our solar system?"
//       }
//     ],
//     "user": "Elizabeth"
//   },
//   {
//     "polls": [
//       {
//         "count": 3,
//         "maxvotedwith": "Carbon dioxide",
//         "post": "Which of the following is a common greenhouse gas?"
//       },
//       {
//         "count": 3,
//         "maxvotedwith": "Ottawa",
//         "post": "What is the capital city of Canada?"
//       }
//     ],
//     "user": "johndoe"
//   }
// ]
