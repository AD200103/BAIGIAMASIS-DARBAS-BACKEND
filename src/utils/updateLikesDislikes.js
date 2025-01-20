const updateLikeDislike = (req, findAnswerToUpdate) => {
  if (req.body.pressed == "dislike pressed") {
    const body = {
      usersWhoDislikedTheAnswer:
        findAnswerToUpdate.usersWhoDislikedTheAnswer.includes(req.body.userId)
          ? findAnswerToUpdate.usersWhoDislikedTheAnswer.filter(
              (id) => id !== req.body.userId
            )
          : [...findAnswerToUpdate.usersWhoDislikedTheAnswer, req.body.userId],
      usersWhoLikedTheAnswer:
        findAnswerToUpdate.usersWhoLikedTheAnswer.includes(req.body.userId)
          ? findAnswerToUpdate.usersWhoLikedTheAnswer.filter(
              (id) => id !== req.body.userId
            )
          : findAnswerToUpdate.usersWhoLikedTheAnswer,
    };
    return body;
  }

  if (req.body.pressed == "like pressed") {
    const body = {
      usersWhoLikedTheAnswer:
        findAnswerToUpdate.usersWhoLikedTheAnswer.includes(req.body.userId)
          ? findAnswerToUpdate.usersWhoLikedTheAnswer.filter(
              (id) => id !== req.body.userId
            )
          : [...findAnswerToUpdate.usersWhoLikedTheAnswer, req.body.userId],
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
