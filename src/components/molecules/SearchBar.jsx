import React, { useState } from 'react';
import { Input, Container } from "../atoms";
import { DOM } from "../nanites";
import { ReactComponent as Search } from '../../assets/Search.svg';

const SearchBar = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchLocations = async (value) => {
    if (value.length < 3) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(value)}&limit=5`
      );
      const data = await response.json();
      
      const formatted = data.map(item => {
        const city = item.address.city || item.address.town || item.address.village;
        const country = item.address.country;
        
        if (city) {
          return {
            id: item.place_id,
            city: city,
            country: country,
            type: 'city'
          };
        }
        else if (country) {
          return {
            id: item.place_id,
            country: country,
            type: 'country'
          };
        }
        return null;
      })
      .filter(item => item !== null);
      
      const uniqueResults = formatted.reduce((acc, current) => {
        const x = acc.find(item => 
          item.city === current.city && 
          item.country === current.country
        );
        if (!x) {
          return acc.concat([current]);
        }
        return acc;
      }, []);
      
      setSuggestions(uniqueResults);
      setIsOpen(true);
    } catch (error) {
      console.error('Erreur de recherche:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const debouncedSearch = React.useCallback(
    debounce(searchLocations, 300),
    []
  );

  const handleSearch = (value) => {
    setQuery(value);
    if (value.length > 0) {
      debouncedSearch(value);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (suggestion) => {
    const displayValue = suggestion.city 
      ? `${suggestion.city}, ${suggestion.country}`
      : suggestion.country;
    
    setQuery(displayValue);
    setSuggestions([]);
    setIsOpen(false);

    // Envoi des données au parent
    if (onLocationSelect) {
      onLocationSelect({
        type: suggestion.type,
        city: suggestion.city,
        country: suggestion.country
      });
    }
  };

  return (
    <Container.SearchContainer>
      <Container.ColumnContainer style={{ position: 'relative', flex: 1 }}>
        <Input.Label>Rechercher un pays, une ville</Input.Label>
        <Input.Search
          placeholder="ex : Paris"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length >= 3 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
        
        {isOpen && (
          <DOM.StyledContainer
            position="absolute"
            top="100%"
            left="0"
            right="0"
            backgroundColor="white"
            borderRadius="8px"
            boxShadow="0 2px 8px rgba(0,0,0,0.1)"
            marginTop="4px"
            zIndex="1000"
          >
            {isLoading ? (
              <DOM.StyledContainer padding="12px">
                Chargement...
              </DOM.StyledContainer>
            ) : suggestions.length > 0 ? (
              suggestions.map((suggestion) => (
                <DOM.StyledContainer
                  key={suggestion.id}
                  padding="12px"
                  cursor="pointer"
                  hoverBackgroundColor="#F5F5F5"
                  onClick={() => handleSelect(suggestion)}
                >
                  {suggestion.city ? (
                    <>
                      <DOM.StyledContainer as="span" fontWeight="500">
                        {suggestion.city}
                      </DOM.StyledContainer>
                      <DOM.StyledContainer as="span" color="#666">
                        , {suggestion.country}
                      </DOM.StyledContainer>
                    </>
                  ) : (
                    <DOM.StyledContainer as="span" fontWeight="500">
                      {suggestion.country}
                    </DOM.StyledContainer>
                  )}
                </DOM.StyledContainer>
              ))
            ) : (
              <DOM.StyledContainer padding="12px">
                Aucun résultat trouvé
              </DOM.StyledContainer>
            )}
          </DOM.StyledContainer>
        )}
      </Container.ColumnContainer>
      
      <DOM.StyledContainer 
        backgroundColor="#3E5544" 
        padding="10px" 
        borderRadius="999px" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
      >
        <Search />
      </DOM.StyledContainer>
    </Container.SearchContainer>
  );
};

export default SearchBar;