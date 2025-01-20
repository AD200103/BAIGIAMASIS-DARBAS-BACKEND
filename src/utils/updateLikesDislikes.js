const updateLikeDislike = (req, findAnswerToUpdate) => {
  if ("dislikeStatus" in req.body) {
    const body = {
      usersWhoDislikedTheAnswer:
        findAnswerToUpdate.usersWhoDislikedTheAnswer.includes(req.body.userId)
          ? findAnswerToUpdate.usersWhoDislikedTheAnswer.filter(
              (id) => id !== req.body.userId
            )
          : [...findAnswerToUpdate.usersWhoDislikedTheAnswer, req.body.userId],
      likeStatus: false,
      dislikeStatus: req.body.dislikeStatus,
      usersWhoLikedTheAnswer:
        findAnswerToUpdate.usersWhoLikedTheAnswer.includes(req.body.userId)
          ? findAnswerToUpdate.usersWhoLikedTheAnswer.filter(
              (id) => id !== req.body.userId
            )
          : findAnswerToUpdate.usersWhoLikedTheAnswer,
    };
    return body;
  }

  if ("likeStatus" in req.body) {
    const body = {
      usersWhoLikedTheAnswer:
        findAnswerToUpdate.usersWhoLikedTheAnswer.includes(req.body.userId)
          ? findAnswerToUpdate.usersWhoLikedTheAnswer.filter(
              (id) => id !== req.body.userId
            )
          : [...findAnswerToUpdate.usersWhoLikedTheAnswer, req.body.userId],
      likeStatus: req.body.likeStatus,
      dislikeStatus: false,
      usersWhoDislikedTheAnswer:
        findAnswerToUpdate.usersWhoDislikedTheAnswer.includes(req.body.userId)
          ? findAnswerToUpdate.usersWhoDislikedTheAnswer.filter(
              (id) => id !== req.body.userId
            )
          : findAnswerToUpdate.usersWhoDislikedTheAnswer,
    };
    return body;
  }
};
export default updateLikeDislike;
