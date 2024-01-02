import styled from 'styled-components';

const AsideContainer = styled.aside`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 10px;
   border: 1px solid red;
   border-radius: 10px;
   padding: 10px 20px;
   margin: 10px;
`

export default function Notification() {
  return (
    <Card>
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
    </Card>
    // <AsideContainer>
    //   <p>Votre compte a été suspendu pour une période de XXX temps car vous n'avez pas respecté les <a>conditions d'utilisations</a>.</p>
    //   <p>Objet de la sanction : xxx</p>
    //   <p>Motif du banissement : xxx</p>
    // </AsideContainer>
  )
}
