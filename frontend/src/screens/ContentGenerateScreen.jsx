import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useState } from "react";
import pdfToText from "react-pdftotext";
import { useGenerateMutation } from "../slices/resumeSlice";

const ContentGenerateScreen = () => {

    const [resumeText , setResumeText] = useState();
    const [jobDescription, setJobDescription] = useState();

    const [rewrittenResumeText , setRewrittenResumeText] = useState(); //]

    const [generate, { isLoading }] = useGenerateMutation();

    const submitHandler = async(e) => {
        e.preventDefault();
        console.log(resumeText);
        console.log(jobDescription);

        const res = await generate({ resumeText, jobDescription }).unwrap();
        setRewrittenResumeText(res.resumeText);
        
    }

    const resumeChangeHandler = (e) => {
        const file = e.target.files[0];
  pdfToText(file)
    .then((text) =>{
        setResumeText(text);
        console.log(text);
    })
    .catch((error) => console.error("Failed to extract text from pdf"));
    }

    return <FormContainer>
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Upload Resume</Form.Label>
        <Form.Control onChange={resumeChangeHandler} type="file" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Job Description</Form.Label>
        <Form.Control onChange={(e)=>setJobDescription(e.target.value)} as="textarea" rows={3} />
      </Form.Group>

      {
        rewrittenResumeText && (<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Rewritten Resume</Form.Label>
        <Form.Control value={rewrittenResumeText} as="textarea" rows={10} />
      </Form.Group>)
      }
      <Button
          disabled={isLoading}
          type='submit'
          variant='primary'
          className='mt-3'
        >
           { isLoading ? "Please wait..." : "Generate Now"}
        </Button>
    </Form>
    </FormContainer>
}

export default ContentGenerateScreen;