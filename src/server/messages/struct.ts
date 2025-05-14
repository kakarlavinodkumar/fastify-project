export interface UpdateMessagePayload {
    flightInstanceId: string,
    messageId: string,
    action: string
}

export interface UpdateMessageResponse {
    flightNumber: string,
    origin: string,
    destination: string,
    scheduledOriginDate: Date,
    action: string
}
