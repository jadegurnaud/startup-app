import React, { useState } from 'react';
import { DOM } from '../nanites';
import { Container, Text, Input } from "../atoms";
import { ReactComponent as PlusBlack } from "../../assets/PlusBlack.svg";
import { ReactComponent as Minus } from "../../assets/Minus.svg";
import { Type, Image, Link as LinkIcon } from 'lucide-react';

const ContentBlocks = ({ 
    contentBlocks = [], 
    onAddBlock, 
    onRemoveBlock, 
    onUpdateBlock 
}) => {
    const [selectedType, setSelectedType] = useState('TEXT');

    const handleAddBlock = () => {
        const newBlock = {
            id: Date.now(), // Temporaire, à remplacer par l'ID du backend
            contentType: selectedType,
            content: '',
            order: contentBlocks.length + 1
        };
        onAddBlock(newBlock);
    };

    return (
        <Container.ColumnContainer gap="20px">
            <Container.RowContainer gap="10px">
                <Container.RowContainer 
                    onClick={() => setSelectedType('TEXT')}
                    padding="12px"
                    backgroundColor={selectedType === 'TEXT' ? "rgba(62, 85, 68, 0.10)" : "#F0EFEB"}
                    cursor="pointer"
                >
                    <Container.RowContainer width="150px" gap="10px" alignItems="center">
                        <Type size={20} />
                        <Text.Span color="#3E5544">Texte</Text.Span>
                    </Container.RowContainer>
                </Container.RowContainer>

                <Container.RowContainer 
                    onClick={() => setSelectedType('IMAGE')}
                    padding="12px"
                    backgroundColor={selectedType === 'IMAGE' ? "rgba(62, 85, 68, 0.10)" : "#F0EFEB"}
                    cursor="pointer"
                >
                    <Container.RowContainer width="150px" gap="10px" alignItems="center">
                        <Image size={20} />
                        <Text.Span color="#3E5544">Image</Text.Span>
                    </Container.RowContainer>
                </Container.RowContainer>

                <Container.RowContainer 
                    onClick={() => setSelectedType('LINK')}
                    padding="12px"
                    backgroundColor={selectedType === 'LINK' ? "rgba(62, 85, 68, 0.10)" : "#F0EFEB"}
                    cursor="pointer"
                >
                    <Container.RowContainer width="150px" gap="10px" alignItems="center">
                        <LinkIcon size={20} />
                        <Text.Span color="#3E5544">Lien</Text.Span>
                    </Container.RowContainer>
                </Container.RowContainer>
            </Container.RowContainer>

            {contentBlocks.map((block, index) => (
                <Container.ColumnContainer 
                    key={block.id || index}
                    padding="16px"
                    backgroundColor="#FFFFFF"
                    borderRadius="8px"
                    gap="10px"
                >
                    <Container.RowContainer justifyContent="space-between" alignItems="center">
                        <Text.Paragraph>
                            {block.contentType === 'TEXT' ? 'Texte' : 
                             block.contentType === 'IMAGE' ? 'Image' : 'Lien'} {index + 1}
                        </Text.Paragraph>
                        <DOM.StyledContainer 
                            cursor="pointer"
                            onClick={() => onRemoveBlock(block.id)}
                        >
                            <Minus />
                        </DOM.StyledContainer>
                    </Container.RowContainer>

                    {block.contentType === 'TEXT' ? (
                        <Input.TextArea
                            value={block.content || ""}
                            onChange={(e) => onUpdateBlock(block.id, { content: e.target.value })}
                            placeholder="Écrivez votre texte ici..."
                        />
                    ) : (
                        <Input.InputForm
                            type="url"
                            value={block.content || ""}
                            onChange={(e) => onUpdateBlock(block.id, { content: e.target.value })}
                            placeholder={`Entrez l'URL ${block.contentType === 'IMAGE' ? "de l'image" : "du lien"}...`}
                        />
                    )}
                </Container.ColumnContainer>
            ))}

            <Container.RowContainer 
                onClick={handleAddBlock}
                padding="12px"
                backgroundColor="#F0EFEB"
                cursor="pointer"
                justifyContent="center"
                alignItems="center"
                gap="8px"
            >
                <PlusBlack />
                <Text.Span>Ajouter un bloc de contenu</Text.Span>
            </Container.RowContainer>
        </Container.ColumnContainer>
    );
};

export default ContentBlocks;