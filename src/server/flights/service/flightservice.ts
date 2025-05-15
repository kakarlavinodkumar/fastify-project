import { DAP_GET_FLIGHTS_END_POINT } from "../../../appconstants/constants";
import { axiosGet } from "../../../utils/axiosWrapper";
import { FlightsSearchPayload, FlightsSearchResponse } from "../struct";

export const flightsSearchService = async (payload: FlightsSearchPayload): Promise<FlightsSearchResponse> => {
    // Payload destructuring
    const { flightNumber, origin, destination, scheduledDate } = payload;

    // Payload validation
    if (!flightNumber) {
        throw new Error("Flight Number is required");
    }
    if (!origin) {
        throw new Error("Flight origin is missing");
    }
    if (!destination) {
        throw new Error("Flight destination is missing");
    }
    if (!scheduledDate) {
        throw new Error("Scheduled date is missing");
    }

    // Business logic
    const url = `${DAP_GET_FLIGHTS_END_POINT}/${flightNumber}?departureDate=${scheduledDate}`;

    const flightsResponse =  axiosGet(url);
    
    // Call DB service 
    // Flights data is fetched from other services

    // Response
    return {
        flightInfo: {
            flightInstanceId: "AS_1_DCASEA_2025-05-15",
            flightNumber: "AS1234",
            origin: "DCA",
            destination: "SEA",
            scheduledOriginDate: "2025-05-15"
        },
        preTravelMessages: [
            {
                id: "1",
                title: "test",
                airshipTemplateId: "test",
                messageText: "test",
                status: "test"
            }
        ],
        dayOfTravelMessages: [
            {
                id: "1",
                title: "test",
                airshipTemplateId: "test",
                messageText: "test",
                status: "test"
            }
        ],
        postTravelMessages: [
            {
                id: "1",
                title: "test",
                airshipTemplateId: "test",
                messageText: "test",
                status: "test"
            }
        ]
    };
};