import expressAsyncHandler from "express-async-handler";
import { processResumeAndRewrite } from "../utils/generateResumeText.js";

export const resumeTextGenerator = expressAsyncHandler(async (req, res) => {
  const { resumeText, jobDescription } = req.body;

  const rewrittenText = await processResumeAndRewrite(
    jobDescription,
    resumeText
  );

  res.json({
    resumeText: rewrittenText,
  });
});
