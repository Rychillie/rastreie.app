import { NextApiRequest, NextApiResponse } from "next";
import { rastro } from "rastrojs";
import { format } from "date-fns";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const code = req.query.code;
  const data = await rastro.track(code);
  const result = data[0];

  if (result.isInvalid) {
    return res.status(200).json(result);
  }

  const tracking: ITracking = {
    ...result,
    type: result.type || "n/a",
    isDelivered: !!result.isDelivered,
    postedAt: result.postedAt,
    updatedAt: result.updatedAt,
    tracks: result.tracks
      .map((track) => {
        const splitObservation = track.observation?.match(
          /^de ([a-z\u00C0-\u00ff z/]+) para ([a-z\u00C0-\u00ff z/]+)$/
        );
        let path = null;
        if (splitObservation && splitObservation.length === 3) {
          path = {
            from: splitObservation[1],
            to: splitObservation[2],
          };
        }
        return {
          locale: track.locale,
          status: track.status.replace(" - por favor aguarde", ""),
          trackedAt: track.trackedAt,
          formattedTrackedAt: format(track.trackedAt, "dd/MM/yyyy HH:mm"),
          path,
        };
      })
      .reverse(),
  };

  return res.status(200).json(tracking);
};
