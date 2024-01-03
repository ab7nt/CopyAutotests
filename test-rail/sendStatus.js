const { testRail } = require("./config");

async function sendStatusInTestRail(statusId, caseId) {
  if (!testRail.testRunId) {
    return;
  } else {
    const response = await fetch(
      `${testRail.domen}?/api/v2/add_result_for_case/${testRail.testRunId}/${caseId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${testRail.login}:${testRail.password}`
          ).toString("base64")}`,
        },
        body: JSON.stringify({
          status_id: statusId,
          comment: "Automatic testing status",
        }),
      }
    );
    return await response.json();
  }
}

// async function sendStatusInTestRail(statusId, caseId) {
//   const response = await fetch(
//     `${testRail.domen}?/api/v2/add_result_for_case/${testRail.testRunId}/${caseId}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Basic ${Buffer.from(
//           `${testRail.login}:${testRail.password}`
//         ).toString("base64")}`,
//       },
//       body: JSON.stringify({
//         status_id: statusId,
//         comment: "Automatic testing status",
//       }),
//     }
//   );
//   return await response.json();
// }
module.exports = sendStatusInTestRail;
