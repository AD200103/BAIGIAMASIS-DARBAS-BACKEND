const updateLikeDislike = (req, findAnswerToUpdate) => {
  if (req.body.likeStatus) {
    const body = {
      usersWhoLikedTheAnswer:
        findAnswerToUpdate.usersWhoLikedTheAnswer.includes(req.body.userId)
          ? findAnswerToUpdate.usersWhoLikedTheAnswer.filter(
              (id) => id !== req.body.userId
            )
          : [...findAnswerToUpdate.usersWhoLikedTheAnswer, req.body.userId],
      likeStatus: req.body.likeStatus,
      dislikeStatus: false,
    };
    return body;
  }
  if (req.body.dislikeStatus) {
    const body = {
      usersWhoDislikedTheAnswer:
        findAnswerToUpdate.usersWhoDislikedTheAnswer.includes(req.body.userId)
          ? findAnswerToUpdate.usersWhoDislikedTheAnswer.filter(
              (id) => id !== req.body.userId
            )
          : [...findAnswerToUpdate.usersWhoDislikedTheAnswer, req.body.userId],
      likeStatus: false,
      dislikeStatus: req.body.dislikeStatus,
    };
    return body;
  }
};
export default updateLikeDislike;
