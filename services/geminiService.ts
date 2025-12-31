import { GoogleGenAI, Type } from "@google/genai";
import { Mentor, LearningGoal, Industry, ExperienceLevel, Language, BudgetRange, PreferredDays } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const PHOTO_POOL = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=400&auto=format&fit=crop"
];

export async function generateMentors(
  goal: LearningGoal, 
  industry: Industry, 
  level: ExperienceLevel, 
  language: Language, 
  budget: BudgetRange,
  days: PreferredDays
): Promise<Mentor[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate 6 realistic professional mentor profiles for a mentee interested in ${goal} within the ${industry} industry. 
    The mentee identifies as ${level} level, prefers communication in ${language}, and has a budget preference of ${budget} per session. 
    Crucially, the mentee is looking for mentors available during ${days}.
    Each mentor should be significantly more experienced than the mentee and fluent in ${language}.
    
    IMPORTANT: For each mentor, you must select one URL from the following list of professional headshots that best fits the profile you generate:
    ${PHOTO_POOL.join('\n')}

    Each profile should include:
    - A professional name
    - A relevant job title at a famous or plausible tech company
    - A compelling 3-sentence bio
    - 2 specific success stories from their mentoring career
    - 3 unique mentoring style tags
    - A rating between 4.7 and 5.0
    - Number of sessions between 50 and 500
    - A list of languages they speak (must include ${language})
    - An hourly rate that fits within the ${budget} range (if 'Free', set to 'Free')
    - The selected avatar URL from the list provided above
    - An 'availability' array containing full names of days they are typically free (e.g., ["Monday", "Wednesday"]). This MUST align with the chosen preference: ${days}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            name: { type: Type.STRING },
            role: { type: Type.STRING },
            company: { type: Type.STRING },
            bio: { type: Type.STRING },
            successStories: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            mentoringStyle: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            rating: { type: Type.NUMBER },
            sessionCount: { type: Type.INTEGER },
            languages: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            hourlyRate: { type: Type.STRING },
            avatar: { type: Type.STRING, description: "Must be one of the provided Unsplash URLs" },
            availability: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["id", "name", "role", "company", "bio", "successStories", "mentoringStyle", "rating", "sessionCount", "languages", "hourlyRate", "avatar", "availability"]
        }
      }
    }
  });

  const rawMentors = JSON.parse(response.text || '[]');
  return rawMentors.map((m: any, index: number) => ({
    ...m,
    id: m.id || `m-${index}`,
    industry,
    avatar: m.avatar && m.avatar.startsWith('https') ? m.avatar : PHOTO_POOL[index % PHOTO_POOL.length]
  }));
}