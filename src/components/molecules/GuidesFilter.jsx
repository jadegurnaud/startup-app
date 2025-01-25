import React from 'react';
import {Select, Container, Text} from "../atoms";
import { DOM } from "../nanites";

const GuidesFilter = () => {
 
  
  return (
    <Container.RowContainer>
        <Text.SubTitle>
            Guides
        </Text.SubTitle>
        <Select.Base>
            <Select.Option value="all">Guides les plus aimés</Select.Option>
            <Select.Option value="favorites">Guides récents</Select.Option>
            <Select.Option value="favorites">Abonnements</Select.Option>
        </Select.Base>
    </Container.RowContainer>
      
  );
};

export default GuidesFilter;