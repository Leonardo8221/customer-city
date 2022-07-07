import { Box, Divider, Typography } from '@mui/material';
import update from 'immutability-helper';
import { FC, memo, useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';

import { Card, Item, ItemTypes } from './Card';
import { ThirdMain, CardPanel, CardAddBox } from './ui';

export interface ContainerState {
  cards: any[];
}

export interface CardItem {
  id: number;
  text: string;
}

const ITEMS: CardItem[] = [
  {
    id: 1,
    text: 'Prospecting',
  },
  {
    id: 2,
    text: 'Outreach',
  },
  {
    id: 3,
    text: 'Engagement',
  },
  {
    id: 4,
    text: 'Discovery',
  },
  {
    id: 5,
    text: 'Qualificiation',
  },
];

export const Container: FC = memo(function Container() {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | undefined>();

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
      setCards((oldCards) => [...oldCards.slice(0, index), card, ...oldCards.slice(index)]);
    },
    [setCards],
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: ({ card, isDemo }: Item) => {
        if (!isDemo || !hoverIndex) return;
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
        setCards((oldCards) => [...oldCards, card]);
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
        {ITEMS.map((card, idx) => (
          <Card card={card} moveCard={moveCard} findCard={findCard} isDemo key={idx} />
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
