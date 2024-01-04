import ProfilDetails from './ProfilView';
import ProfilNotifications from './ProfilNotifications';
import ProfilStories from './ProfilStories';
import ProfilParameters from './ProfilParameters';
import ProfilFollows from './ProfilFollows';
import { useDispatch } from 'react-redux';
import { clearAuth } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';


export default function ProfilList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(clearAuth());
    navigate('/');
    console.log('deco')
  };

  return (
    <></>
  //   <Accordion allowToggle>
  //     <AccordionItem>
  //       <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
  //         <Box as="span" flex="1" textAlign="left">
  //           Mon profil
  //         </Box>
  //         <AccordionIcon />
  //       </AccordionButton>

  //       <AccordionPanel pb={4}>
  //         <ProfilDetails />
  //       </AccordionPanel>
  //     </AccordionItem>

  //     <AccordionItem>
  //       <AccordionButton>
  //         <Box as="span" flex="1" textAlign="left">
  //           Mes notifications
  //         </Box>
  //         <AccordionIcon />
  //       </AccordionButton>
  //       <AccordionPanel pb={4}>
  //         <ProfilNotifications />
  //       </AccordionPanel>
  //     </AccordionItem>

  //     <AccordionItem>
  //       <AccordionButton>
  //         <Box as="span" flex="1" textAlign="left">
  //           Mes créations
  //         </Box>
  //         <AccordionIcon />
  //       </AccordionButton>
  //       <AccordionPanel pb={4}>
  //         <ProfilStories />
  //       </AccordionPanel>
  //     </AccordionItem>

  //     <AccordionItem>
  //       <AccordionButton>
  //         <Box as="span" flex="1" textAlign="left">
  //           Mes suivis
  //         </Box>
  //         <AccordionIcon />
  //       </AccordionButton>
  //       <AccordionPanel pb={4}>
  //         <ProfilFollows />
  //       </AccordionPanel>
  //     </AccordionItem>

  //     <AccordionItem>
  //       <AccordionButton>
  //         <Box as="span" flex="1" textAlign="left">
  //           Mes paramètres
  //         </Box>
  //         <AccordionIcon />
  //       </AccordionButton>
  //       <AccordionPanel pb={4}>
  //         <ProfilParameters />
  //       </AccordionPanel>
  //     </AccordionItem>

  //     <Button onClick={handleClick}>
  //        Déconnexion
  //     </Button>
  //  </Accordion>
  );
}
