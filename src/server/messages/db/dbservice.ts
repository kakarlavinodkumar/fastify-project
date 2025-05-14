import { FastifyInstance } from "fastify";
import { Repository } from "typeorm";
import { UpdateMessagePayload } from "../struct";
import { Message } from "../../../database/entities/message";

// Update message by ID
export const updateMessageByIDInDB = async (fastify: FastifyInstance, payload: UpdateMessagePayload) => {
    // DB logic
    const messageRepository: Repository<Message> = fastify.orm.getRepository(Message);

    // DB operation
    const result = await messageRepository.update(payload.messageId, {
        action: ["Sent", "Scheduled", "Paused"].includes(payload.action) ? (payload.action as "Sent" | "Scheduled" | "Paused") : undefined
    });

    if (result.affected === 0) {
        throw new Error("Message not found or not updated");
    }

    // Response
    return result;
}

