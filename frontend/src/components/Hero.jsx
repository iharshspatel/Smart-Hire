import { Container, Card, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>Generate ATS Friendly Resume Content</h1>
          <p className='text-center mb-4'>
            This is AI powered ATS friendly personolised resume content generator for everyone.
          </p>
          <div className='d-flex'>
            <Button variant='primary' href='/generate' className='me-3'>
              Generate Now
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
