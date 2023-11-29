
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Grid, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const About = () => {

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    return (
        <div>
      

              <div>
      <Accordion sx={{marginX: 20, marginTop: 20, backgroundColor: '#84cc16', color: 'white'}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
          Becoming Pro User
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}> Becoming Pro User</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Unlocking the full potential of our platform, users can elevate their experience by becoming Pro members through a convenient payment option. Pro users enjoy the privilege of providing insightful comments on surveys, adding depth to the collaborative feedback process. This exclusive feature not only enhances user engagement but also contributes to a richer and more meaningful interaction within our community.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{marginX: 20, backgroundColor: '#84cc16', color: 'white'}} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}> User Experience.</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
          User Experience.
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Our platform goes beyond the ordinary by allowing users to engage in surveys seamlessly. This interactive feature empowers users to share valuable feedback, fostering a collaborative environment where their opinions shape the platform's evolution. We believe in putting the user at the forefront, ensuring a dynamic and user-centric experience.
          </Typography>
        </AccordionDetails>
      </Accordion>
   
      <Accordion sx={{marginX: 20,  backgroundColor: '#84cc16', color: 'white'}} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Goal of survey</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Our survey-making application is designed with a clear goal: to empower users in seamlessly creating surveys that are not only intuitive but also effective in gathering meaningful insights. We aim to provide a user-friendly interface, robust customization options, and analytics tools to ensure that every survey serves its purpose optimally. Our goal is to make survey creation and analysis straightforward, allowing users to harness the power of data-driven decision-making with ease.
          </Typography>
        </AccordionDetails>
      </Accordion>
             </div>

             <Grid sx={{marginX: 20, marginTop: 20}} container spacing={2}>
                <Grid xs={6}>
                <CardMedia
        sx={{ height: 500, width: 700,  }}
        image="https://www.surveylegend.com/wordpress/wp-content/uploads/2021/04/survey-testing.png"
        title="green iguana"
      />
                </Grid>
                <Grid xs={6}>
                <Card sx={{ maxWidth: 345 }}>
    
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
        This website is created by
        </Typography>
        <Typography sx={{height: 400}} variant="h5" color="text.secondary">
          
Kazi Rauf Elahi created this website and on this website user can do many things including any survey crit.
        </Typography>
      </CardContent>
      
    </Card>
                </Grid>
             </Grid>

        </div>
    );
};

export default About;