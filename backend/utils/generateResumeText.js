import OpenAIApi from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

async function extractKeywords(jobDescription) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that extracts important keywords from job descriptions. Identify key skills, qualifications, and experiences mentioned in the job description.",
      },
      {
        role: "user",
        content: `Extract the key skills, qualifications, and experiences required from the following job description:\n\n${jobDescription}`,
      },
    ],
  });
  return response.choices[0].message.content;
}

async function rewriteResume(resumeText, keywords) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that helps rewrite resumes to be more ATS-friendly and properly formatted based on job descriptions. Focus on incorporating keywords, using action verbs, and highlighting relevant skills and experiences.",
      },
      {
        role: "user",
        content: `Rewrite the following resume to make it more ATS-friendly based on these keywords and phrases. Use action verbs, emphasize relevant skills and experiences, and ensure the formatting is professional:\n\nKeywords and Phrases:\n${keywords}\n\nResume:\n${resumeText}`,
      },
    ],
  });
  return response.choices[0].message.content;
}

async function processResumeAndRewrite(resumeText, jobDescription) {
  const keywords = await extractKeywords(jobDescription);
  const rewrittenResume = await rewriteResume(resumeText, keywords);
  return rewrittenResume;
}

export { processResumeAndRewrite };
