export interface FlightsSearchPayload {
    flightNumber: string
    origin: string
    destination: string
    scheduledDate: string
}

export interface Message {
    id: string;
    title: string;
    airshipTemplateId: string;
    messageText: string;
    status: string;
}

export interface FlightsSearchResponse {
    flightInfo: {
        flightInstanceId: string;
        flightNumber: string;
        origin: string;
        destination: string;
        scheduledOriginDate: string;
    };
    preTravelMessages: Array<Message>;
    dayOfTravelMessages: Array<Message>;
    postTravelMessages: Array<Message>;
}