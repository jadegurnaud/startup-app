import React from 'react';
import {Select, Container, Text} from "../atoms";
import { DOM } from "../nanites";

const GuidesFilter = () => {
 
  
  return (
    <Container.RowContainer gap="20px">
        <Text.SubTitle>
            Guides
        </Text.SubTitle>
        <Select.Base>
            <Select.Option value="plusAimes">Les plus aimés</Select.Option>
            <Select.Option value="ajoutsRecents">Ajouts récents</Select.Option>
            <Select.Option value="abonnements">Abonnements</Select.Option>
            <Select.Option value="plusConsultes">Les plus consultés</Select.Option>
        </Select.Base>
    </Container.RowContainer>
      
  );
};

export default GuidesFilter;