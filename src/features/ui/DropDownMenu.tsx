import React, { useState, useRef } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { useAppDispatch } from '../../app/hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    arrowDown: {
      border: `solid ${
        theme.palette.type === 'dark'
          ? theme.palette.grey[100]
          : theme.palette.grey[600]
      }`,
      borderWidth: '0 3px 3px 0',
      display: 'inline-block',
      padding: '3px',
      transform: 'rotate(45deg)'
    }
  })
);

interface DropDownMenuProps {
  options: Map<string, number>;
  defaultOptionIndex: number;
  title?: string;
  onOptionSwitch: ActionCreatorWithPayload<any, string>;
  additionalAction?: () => void;
}

const DropDownMenu = ({
  options,
  defaultOptionIndex,
  title,
  onOptionSwitch
}: DropDownMenuProps): React.ReactElement => {
  const items = Array.from(options.keys());

  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    items[defaultOptionIndex]
  );
  const anchorRef = useRef(null);

  const classes = useStyles();

  const dispatch = useAppDispatch();

  const onToggle = () => {
    setOpen(!open);
  };

  const onListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  const onClose = (
    event:
      | React.MouseEvent<Document, MouseEvent>
      | React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    // @ts-ignore: Object is possibly 'null'.
    if (anchorRef?.current?.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const onItemClick = (
    event:
      | React.MouseEvent<Document, MouseEvent>
      | React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedOption(items[index]);
    const option = options.get(items[index]);
    dispatch(onOptionSwitch(option));
    onClose(event);
  };

  return (
    <React.Fragment>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={onToggle}
      >
        <Typography>
          {title ? `${title}: ` : ''}
          {selectedOption}
        </Typography>
        &nbsp;
        <i className={classes.arrowDown}></i>
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 1000 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={onClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={onListKeyDown}
                  variant="selectedMenu"
                >
                  {items.map((item: string, index: number) => (
                    <div key={index}>
                      <MenuItem onClick={(e) => onItemClick(e, index)}>
                        <Typography>{item}</Typography>
                      </MenuItem>
                      {index < items.length - 1 ? <Divider /> : ''}
                    </div>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default DropDownMenu;
