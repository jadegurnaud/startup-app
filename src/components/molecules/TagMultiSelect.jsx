import React, { useState } from 'react';
import { Text } from '../atoms';
import { X, Check, ChevronDown, ChevronUp } from 'lucide-react';

const styles = {
  container: {
    width: '100%',
    maxWidth: '400px',
    position: 'relative',
    fontFamily: 'Arial, sans-serif'
  },
  selectedArea: {
    minHeight: '45px',
    padding: '8px',
    borderRadius: '6px',
    backgroundColor: '#F6F6F6',
    cursor: 'pointer'
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '4px',
    backgroundColor: '#FFF',
    color: '#6D6D6D',
    fontSize: '14px'
  },
  removeButton: {
    background: 'none',
    border: 'none',
    padding: '2px',
    cursor: 'pointer',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center'
  },
  dropdown: {
    position: 'absolute',
    width: '100%',
    marginTop: '4px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    zIndex: 10,
    maxHeight: '240px',
    overflowY: 'auto'
  },
  option: {
    width: '100%',
    padding: '8px 16px',
    textAlign: 'left',
    border: 'none',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer'
  },
  toggleButton: {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  },
  placeholder: {
    color: '#666',
    fontSize: '14px'
  },
  counter: {
    marginTop: '8px',
    fontSize: '14px',
    color: '#666'
  }
};

const TagMultiSelect = ({categories, initialTags = [], onChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState(initialTags);
  
  const handleTagChange = (newTags) => {
    setSelectedTags(newTags);
    if (onChange) {
      onChange(newTags);
    }
  };
  
  const toggleTag = (category) => {
    if (selectedTags.find(tag => tag.id === category.id)) {
      handleTagChange(selectedTags.filter(tag => tag.id !== category.id));
    } else if (selectedTags.length < 3) {
      handleTagChange([...selectedTags, category]);
    }
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag.id !== tagToRemove.id));
  };

  return (
    <div style={styles.container}>
        <Text.Span>
        Ajouter des tags
      </Text.Span>
      <div 
        style={styles.selectedArea}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={styles.tagsContainer}>
          {selectedTags.map(tag => (
            <span key={tag.id} style={styles.tag}>
              {tag.name}
              <button
                style={styles.removeButton}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
              >
                <X size={14} />
              </button>
            </span>
          ))}
          {selectedTags.length === 0 && (
            <span style={styles.placeholder}>Sélectionnez jusqu'à 3 tags</span>
          )}
        </div>

        <button style={styles.toggleButton}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isOpen && (
        <div style={styles.dropdown}>
          {categories.map(category => (
            <button
              key={category.id}
              style={{
                ...styles.option,
                backgroundColor: selectedTags.find(tag => tag.id === category.id) 
                  ? '#f0f0f0' 
                  : 'transparent'
              }}
              onClick={() => toggleTag(category)}
              disabled={selectedTags.length >= 3 && !selectedTags.find(tag => tag.id === category.id)}
            >
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      )}

      <Text.Span>
        3 maximum
      </Text.Span>
    </div>
  );
};

export default TagMultiSelect;