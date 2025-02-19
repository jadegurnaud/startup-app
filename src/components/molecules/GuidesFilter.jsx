import React, { useState } from 'react';
import {Select, Container, Text} from "../atoms";

const GuidesFilter = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('plusAimes');

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setSelectedFilter(newFilter);
    onFilterChange(newFilter);
  };
  
  return (
    <Container.RowContainer gap="20px">
        <Text.SubTitle className="accueilTitle">
            Guides
        </Text.SubTitle>
        <Select.Base className="guidesFilter" value={selectedFilter} 
          onChange={handleFilterChange}>
            <Select.Option value="plusAimes">Les plus aimés</Select.Option>
            <Select.Option value="ajoutsRecents">Ajouts récents</Select.Option>
            <Select.Option value="abonnements">Abonnements</Select.Option>
            <Select.Option value="plusConsultes">Les plus consultés</Select.Option>
        </Select.Base>
    </Container.RowContainer>
      
  );
};

export default GuidesFilter;