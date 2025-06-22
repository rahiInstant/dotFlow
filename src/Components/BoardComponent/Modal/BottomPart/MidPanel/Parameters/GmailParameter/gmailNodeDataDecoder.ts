export const gmailNodeDataDecoder = (data: any) => {
  if (data) {
    const { parameters } = data;
    const pollTimes = parameters.pollTimes;
    const parsedPollTimes: string[] = [];
    const parsedModes: Record<string, string> = {};
    const parseModesData: Record<string, string | number | boolean> = {};

    if (pollTimes) {
      pollTimes.forEach((item: any) => {
        const pollTimeId = `pollTime_${Math.random()
          .toString(36)
          .substring(2, 8)}`;
        parsedPollTimes.push(pollTimeId);
        parsedModes[pollTimeId] = item.mode;
        parseModesData[pollTimeId] = item.mode;

        if ("hour" in item) {
          parseModesData[`${pollTimeId}_Hour`] = item["hour"];
        }
        if ("minute" in item) {
          parseModesData[`${pollTimeId}_Minute`] = item["minute"];
        }
        if ("dayOfMonth" in item) {
          parseModesData[`${pollTimeId}_Day of Month`] = item["dayOfMonth"];
        }
        if ("weekday" in item) {
          parseModesData[`${pollTimeId}_Weekday`] = item["weekday"];
        }
        if ("value" in item) {
          parseModesData[`${pollTimeId}_Value`] = item["value"];
        }
        if ("unit" in item) {
          parseModesData[`${pollTimeId}_Unit`] = item["unit"];
        }
        if ("cronExpression" in item) {
          parseModesData[`${pollTimeId}_Cron Expression`] =
            item["cronExpression"];
        }
      });
      // console.log(parsedModes);
      // console.log(parsedPoolTimes);
    }

    return {
      simplify: parameters?.simple,
      pollTimes: { parsedPollTimes, parseModesData, parsedModes },
      filters: parameters?.filters,
      options: parameters?.options,
    };
  }
};
