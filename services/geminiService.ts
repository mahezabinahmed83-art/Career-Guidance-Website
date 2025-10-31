import { GoogleGenAI, Type } from "@google/genai";
import { UserData, CareerPath } from '../types';
import { LEARNING_RESOURCES_TEXT } from '../constants';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      careerTitle: { type: Type.STRING, description: "The title of the recommended career path, e.g., 'Frontend Developer'." },
      justification: { type: Type.STRING, description: "A detailed explanation of why this career path is a good fit for the user based on their profile." },
      requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of essential skills for this career." },
      skillGaps: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of skills the user is missing for this career, based on their input." },
      learningRoadmap: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            step: { type: Type.INTEGER, description: "The sequential step number in the learning plan." },
            title: { type: Type.STRING, description: "A concise title for this learning step, e.g., 'Master JavaScript Fundamentals'." },
            description: { type: Type.STRING, description: "A brief description of what to learn in this step." },
            resources: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "A descriptive title for the learning resource." },
                  url: { type: Type.STRING, description: "The direct URL to the learning resource." },
                  type: { type: Type.STRING, description: "The type of resource, e.g., 'Video', 'Playlist', 'Article'." },
                },
                required: ['title', 'url', 'type'],
              },
              description: "A list of 1-3 specific, relevant learning resources for this step, chosen ONLY from the provided resource list.",
            },
          },
          required: ['step', 'title', 'description', 'resources'],
        },
        description: "A step-by-step learning plan to acquire the skills listed in 'skillGaps'."
      },
    },
    required: ['careerTitle', 'justification', 'requiredSkills', 'skillGaps', 'learningRoadmap'],
  },
};


export const generateCareerGuidance = async (userData: UserData): Promise<CareerPath[]> => {
    const prompt = `
    You are an expert career guidance assistant. Your goal is to provide 3 personalized, actionable career path recommendations based on the user's detailed profile.

    **User Profile:**
    - **Name:** ${userData.name}
    - **Age:** ${userData.age}
    - **Interests & Passions:** ${userData.interests}
    - **Current Skills:** ${userData.skills}
    - **Dream Career:** ${userData.dreamCareer || 'Not specified'}
    - **Academic Standing (Percentage/GPA):** ${userData.percentage || 'Not specified'}
    - **College Preferences:** ${userData.collegePreference || 'Not specified'}
    - **Degree Goals:** ${userData.degreeGoals || 'Not specified'}
    - **Study Abroad Goals:** ${userData.abroadGoals}
    - **Preferred Learning Style:** ${userData.learningStyle}
    - **Preferred Tech Area:** ${userData.techPreference.join(', ')}
    - **Preferred Work Environment:** ${userData.workEnvironment.join(', ')}

    **Your Task:**
    1.  Analyze the user's comprehensive profile to understand their strengths, goals, and passions.
    2.  Recommend 3 distinct career paths that align well with their profile. Consider their age, academic standing, and career goals in your recommendations.
    3.  For each recommended career:
        a.  Provide a clear "Career Title".
        b.  Write a "Justification" explaining why it's a great match, referencing specifics from their profile.
        c.  List the key "Required Skills" for that career.
        d.  Identify the user's "Skill Gaps" by comparing their current skills to the required skills.
        e.  Create a step-by-step "Learning Roadmap" to help the user fill these skill gaps.
    4.  **Crucially**, for the "Learning Roadmap", you MUST select relevant resources ONLY from the list provided below. Do not invent or use any other resources. Match the resource to the skill being taught and the user's learning style.

    **Available Learning Resources:**
    ${LEARNING_RESOURCES_TEXT}

    Generate the response in the specified JSON format.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.5,
            },
        });

        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);
        return parsedData as CareerPath[];
    } catch (error) {
        console.error("Error generating content from Gemini API:", error);
        throw new Error("Failed to get career guidance from AI service.");
    }
};