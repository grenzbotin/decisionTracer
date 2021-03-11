import React, { useContext, useEffect, useState } from 'react';
import { Box, IconButton, Popover, TextField, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

function DecisionTitle({
  title,
  onChange,
  variant,
  component
}: {
  title: string;
  onChange: Function;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  component: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [localTitle, setLocalTitle] = useState<string>('');

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocalTitle(e.currentTarget.value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSave = () => {
    onChange(localTitle);
    handleClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? 'edit-name' : undefined;

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant={variant} component={component} noWrap>
        {title}
      </Typography>
      <IconButton
        color="inherit"
        aria-label="edit name"
        onClick={handleClick}
        style={{ marginLeft: '.5rem' }}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Box p={2} style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            id="standard-basic"
            label="Name"
            value={localTitle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            variant="filled"
            size="small"
          />
          <IconButton
            disabled={!localTitle}
            color="primary"
            aria-label="edit name"
            style={{ marginLeft: '1rem' }}
            onClick={handleSave}
          >
            <SaveIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="edit name"
            style={{ marginLeft: '.5rem' }}
            onClick={handleClose}
          >
            <CancelIcon fontSize="small" />
          </IconButton>
        </Box>
      </Popover>
    </div>
  );
}

export default DecisionTitle;