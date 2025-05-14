import { FastifyInstance } from "fastify";
import { updateMessageByIDInDB } from "../db/dbservice";
import { UpdateMessagePayload, UpdateMessageResponse } from "../struct";

export const updateMessageService = async (fastify: FastifyInstance, payload: UpdateMessagePayload): Promise<UpdateMessageResponse> => {
    // Payload destructuring
    const { flightInstanceId, messageId, action } = payload;

    // Payload validation
    if (!flightInstanceId || !messageId || !action) {
        throw new Error("All fields are required");
    }
    if(!["Sent", "Scheduled", "Paused"].includes(payload.action)) {
        throw new Error("message action should be Sent or Scheduled or Paused")
    }

    // Business logic

    // Call DB service
    await updateMessageByIDInDB(fastify, payload);

    // Response
    // Call to fetch flight details service to populate flight data
    const response: UpdateMessageResponse = {
        flightNumber: "AS1234",
        origin: "SEA",
        destination: "VAN",
        scheduledOriginDate: new Date(),
        action: payload.action
    };
    return response;
}