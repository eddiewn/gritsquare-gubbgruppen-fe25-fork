import { postReply } from "./userApi.js";

import { censorBadWords } from "./censor.js";

export const sendReply = async (messageKey, text = "") => {

    if (!text || !text.trim()) {
        return alert("Skriv ett svar först.");
    }

    let safeMessage = text;
    try {
        safeMessage = censorBadWords(text);
    } catch (error) {
        console.error("Censur-fel vid svar:, skickar obehandlat svar:", error);
        safeMessage = text;
    }

    const replyData = {
        message: safeMessage,
        parent_id: messageKey,
        user_id: 0,
        createdAt: Date.now(),
    };

    try {
        await postReply(replyData)
    } catch (error) {
        console.error("Kunde inte skicka svaret:", error);
        alert("Fel vid skickning av svaret. Försök igen.");
    }
};