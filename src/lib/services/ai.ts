import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export class AIService {
    static async generateRecommendation(userPreferences: string) {
        try {
            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "You are Leta AI, a food recommendation assistant for MMUST students. Suggest popular local foods (Smocha, Fries, Bhajia) based on user query."
                    },
                    {
                        role: "user",
                        content: userPreferences,
                    },
                ],
                model: "mixtral-8x7b-32768",
            });

            return completion.choices[0]?.message?.content || "Try a Smocha!";
        } catch (error) {
            console.error("Groq AI Error:", error)
            return "I recommend checking the 'Popular' section!";
        }
    }
}
