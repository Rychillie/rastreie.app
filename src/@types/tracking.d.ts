interface ITrackingEvent {
  trackedAt: Date;
  formattedTrackedAt: string;
  locale: string;
  status: string;
  path: {
    from: string;
    to: string;
  } | null;
}

interface ITracking {
  code: string;
  type: string;
  isDelivered: boolean;
  tracks: ITrackingEvent[];
  postedAt: Date;
  updatedAt: Date;
  isInvalid?: boolean;
  error?: string;
}
