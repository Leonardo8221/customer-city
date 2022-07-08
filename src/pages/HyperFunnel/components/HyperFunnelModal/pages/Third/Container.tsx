import { Box, Divider, Typography } from '@mui/material';
import update from 'immutability-helper';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDealStage } from 'store/dealStage/hooks';
import { DealStage } from 'store/dealStage/types';

import { Card, Item, ItemTypes } from './Card';
import { ThirdMain, CardPanel, CardAddBox } from './ui';

export interface ContainerState {
  cards: any[];
}

export interface CardItem extends DealStage {
  customDealStageName?: string;
  createdAt?: Date;
}

interface DealStageType {
  value: string;
  color: string;
}

export const DEAL_STAGE_TYPES: DealStageType[] = [
  { value: 'Pre-Sales', color: 'primary.main' },
  { value: 'Sales', color: 'green.main' },
  { value: 'Post-Sales', color: 'orange.main' },
];

export const Container: FC = memo(function Container() {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | undefined>();
  const { dealStages, getDealStages } = useDealStage();

  useEffect(() => {
    getDealStages();
  }, [getDealStages]);

  const findCard = useCallback(
    (cardItem: CardItem) => {
      setHoverIndex(undefined);
      return {
        card: cardItem,
        index: cards.indexOf(cardItem),
      };
    },
    [cards],
  );

  const moveCard = useCallback(
    (cardItem: CardItem, atIndex: number) => {
      const { card, index } = findCard(cardItem);
      setHoverIndex(undefined);
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        }),
      );
    },
    [findCard, cards, setCards],
  );

  const hoverCard = useCallback(
    (index: number) => {
      setHoverIndex(index);
    },
    [setHoverIndex],
  );

  const addCard = useCallback(
    (card: CardItem, index: number) => {
      console.log('addCard,', index);
      setCards((oldCards) => [
        ...oldCards.slice(0, index),
        { ...card, createdAt: new Date() },
        ...oldCards.slice(index),
      ]);
    },
    [setCards],
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: ({ card, isDemo }: Item) => {
        if (!isDemo || hoverIndex === undefined) return;
        addCard(card, hoverIndex);
      },
      collect: (monitor: any) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [hoverIndex],
  );

  const [, otherDrop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: ({ card, isDemo }: Item) => {
        if (!isDemo) return;
        setCards((oldCards) => [...oldCards, { ...card, createdAt: new Date() }]);
      },
    }),
    [hoverIndex],
  );

  const handleDelete = useCallback(
    (index: number) => {
      setCards(update(cards, { $splice: [[index, 1]] }));
    },
    [cards, setCards],
  );

  const DIVIDER = <Divider sx={{ backgroundColor: 'primary.main', my: 1, height: 2 }} />;

  const isEmpty = cards.length === 0;

  return (
    <ThirdMain>
      <CardPanel className="left-card-panel">
        <Typography variant="b16" sx={{ mb: 1 }}>
          Stages
        </Typography>
        {DEAL_STAGE_TYPES.map((stageType) => (
          <>
            <Typography
              variant="p12"
              sx={{
                textTransform: 'uppercase',
                py: '12px',
                mt: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Box sx={{ width: 6, height: 6, backgroundColor: stageType.color, borderRadius: '50%' }}>{''}</Box>
              {stageType.value} {'STAGE'}
            </Typography>
            {dealStages
              .filter((stage) => stage.dealStageType === stageType.value)
              .map((card, idx) => (
                <Card card={card} moveCard={moveCard} findCard={findCard} isDemo key={idx} />
              ))}
          </>
        ))}
      </CardPanel>

      <CardPanel className="right-card-panel" sx={{ backgroundColor: 'darkBg.main' }}>
        <Typography variant="b16" sx={{ mb: 1 }}>
          Configure your Stages
        </Typography>
        <Box ref={drop} className="first">
          {cards.map((card, idx) => (
            <>
              {hoverIndex === idx && isOver && DIVIDER}
              <Card
                card={card}
                moveCard={moveCard}
                findCard={findCard}
                hoverCard={() => hoverCard(idx)}
                deleteCard={() => handleDelete(idx)}
                duplicateCard={() => addCard(card, idx)}
                key={idx}
              />
            </>
          ))}
        </Box>
        <CardAddBox ref={otherDrop} sx={isEmpty ? { border: '1px dashed #CDD2DF', borderRadius: '4px' } : {}}>
          {isEmpty && (
            <>
              <Typography variant="p12" sx={{ color: 'neutral.n400' }}>
                {'You have not added any stages yet'}
              </Typography>
              <Typography variant="p12" sx={{ color: 'neutral.n400' }}>
                {'Drag&Drop stages from the left side here'}
              </Typography>
            </>
          )}
        </CardAddBox>
      </CardPanel>
    </ThirdMain>
  );
});
