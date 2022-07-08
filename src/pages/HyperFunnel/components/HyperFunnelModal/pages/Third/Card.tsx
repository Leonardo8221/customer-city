import { FC, useState } from 'react';
import { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ReactComponent as DotsIcon } from 'assets/icons/dots.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as DragHandleIcon } from 'assets/icons/drag-handle.svg';
import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevronDown.svg';
import { ReactComponent as ChevronUpIcon } from 'assets/icons/chevronUp.svg';
import { CardItem, DEAL_STAGE_TYPES } from './Container';
import { Box, IconButton, Typography } from '@mui/material';
import { CardContainer } from './ui';
import { CustomInput } from 'components/CustomInput';
import { CustomMenu } from 'components/CustomMenu';
import { CustomIconButton } from 'components/ui';

export const ItemTypes = {
  CARD: 'card',
};

export interface Item {
  originalIndex: number;
  card: CardItem;
  isDemo: boolean;
}

export interface CardProps {
  card: CardItem;
  moveCard: (card: CardItem, to: number) => void;
  findCard: (card: CardItem) => { index: number };
  hoverCard?: () => void;
  deleteCard?: () => void;
  duplicateCard?: () => void;
  isDemo?: boolean;
}

export const Card: FC<CardProps> = memo(function Card({
  card,
  moveCard,
  findCard,
  hoverCard,
  deleteCard,
  duplicateCard,
  isDemo = false,
}: CardProps) {
  const originalIndex = findCard(card).index;
  const [open, setOpen] = useState<boolean>(false);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { card, originalIndex, isDemo },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { card: droppedCard, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop && !isDemo) {
          moveCard(droppedCard, originalIndex);
        }
      },
    }),
    [card, originalIndex, moveCard],
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      hover: ({ card: draggedCard, isDemo: isDemoDragged }: Item) => {
        if (draggedCard !== card && !isDemo && !isDemoDragged) {
          const { index: overIndex } = findCard(card);
          moveCard(draggedCard, overIndex);
        }
        if (!isDemo && isDemoDragged) {
          hoverCard?.();
        }
      },
    }),
    [findCard, moveCard],
  );

  const handleActionSelect = (idx: number) => {
    if (idx === 0) duplicateCard?.();
    else if (idx === 1) deleteCard?.();
  };

  return (
    <CardContainer ref={drop} sx={{ backgroundColor: isDemo ? 'lightBg.main' : 'neutral.white' }}>
      <Box ref={drag} className="card-header">
        <IconButton sx={{ cursor: isDragging ? 'move' : 'grab' }}>
          <DragHandleIcon />
        </IconButton>

        <Typography variant="p14" sx={{ mr: 'auto', color: isDemo ? 'neutral.main' : 'neutral.n400' }}>
          {card.dealStageName}
        </Typography>

        {!isDemo && (
          <Typography
            variant="labelRegular10"
            sx={{
              textTransform: 'uppercase',
              color: 'neutral.n400',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                backgroundColor:
                  DEAL_STAGE_TYPES.find((type) => type.value === card.dealStageType)?.color ?? 'primary.main',
                borderRadius: '50%',
              }}
            ></Box>
            {card.dealStageType}
          </Typography>
        )}

        <IconButton onClick={() => setOpen((o) => !o)}>{open ? <ChevronUpIcon /> : <ChevronDownIcon />}</IconButton>

        {!isDemo && (
          <CustomMenu icon={<DotsIcon />} childItems={['Duplicate', 'Delete']} onSelect={handleActionSelect} />
        )}
      </Box>
      {isDemo ? (
        open && (
          <Box className="card-content">
            <Typography variant="p12" sx={{ color: 'neutral.n400' }}>
              {card.dealStageDescription}
            </Typography>
          </Box>
        )
      ) : (
        <Box className="card-content">
          <CustomInput
            id="stageName"
            name="stageName"
            title="Stage name"
            label="Stage name"
            placeholder="Enter the Stage name"
            fullWidth
          />

          {open && (
            <>
              <CustomInput id="goal" name="goal" title="Goal" label="Goal" placeholder="Enter the goal" fullWidth />

              <CustomInput
                id="teamOwner"
                name="teamOwner"
                title="Team ownership"
                label="Team ownership"
                placeholder="Enter the Team ownership"
                fullWidth
              />

              <CustomInput
                id="forecastCategory"
                name="forecastCategory"
                title="Forecast Category"
                label="Forecast Category"
                placeholder="Enter the forecast category"
                fullWidth
              />

              <CustomIconButton startIcon={<PlusIcon />} sx={{ p: 0.5, height: 20 }}>
                Attach Documents
              </CustomIconButton>
            </>
          )}
        </Box>
      )}
    </CardContainer>
  );
});
