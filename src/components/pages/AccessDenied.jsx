import React from 'react';
import { Text, Container } from '../atoms';

const AccessDenied = () => {
  return (
    <Container.App className="AccessDenied">
      <Text.Title>Accès Refusé</Text.Title>
      <Text.Paragraph>Vous n'avez pas les droits d'accès pour cette page.</Text.Paragraph>
    </Container.App>
  );
};

export default AccessDenied;