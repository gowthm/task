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