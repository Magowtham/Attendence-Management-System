async function searchMember(fingerPrint, members, currentTime, date) {
  const data = await members
    .find({ name: fingerPrint })
    .project({
      _id: 0,
      name: 0,
      branch: 0,
      fingerPrint: 0,
      history: { $slice: -1 },
    })
    .toArray();
  const history = data.length !== 0 ? data[0].history : "notRegistered";
  const historySize = await members
    .aggregate([
      {
        $match: { name: fingerPrint },
      },
      {
        $project: {
          _id: 0,
          historySize: { $size: { $ifNull: ["$history", []] } },
        },
      },rfid price
    ])
    .toArray();

  if (history === "notRegistered") {
    return false;
  } else {
    if (history.length === 0) {
      history[0] = {
        date: date,
        loginTime: currentTime,
        logoutTime: "inLab",
      };
      try {
        historySize[0].historySize - 1;
        await members.updateOne(
          { name: fingerPrint },
          { $push: { history: history[0] } }
        );
      } catch (err) {
        console.log(err);
      }
    } else if (history[0].logoutTime == "inLab") {
      try {
        await members.updateOne(
          {
            name: fingerPrint,
          },
          {
            $set: {
              [`history.${historySize[0].historySize - 1}.logoutTime`]:
                currentTime,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      history[0] = {
        date: date,
        loginTime: currentTime,
        logoutTime: "inLab",
      };
      try {
        await members.updateOne(
          { name: fingerPrint },
          { $push: { history: history[0] } }
        );
      } catch (err) {
        console.log(err);
      }
    }
  }
}
module.exports = searchMember;
