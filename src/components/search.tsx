import * as React from 'react';
import { useRef, useEffect } from 'react';
import { TextField, FormControl, List, ListItem, ListItemText, Box } from '@material-ui/core';

export interface Props {
  data: {
    prefecture: string;
    autocomplete: {
      prefecture: {
        items:  string[]
        cursor: number
      }
    }
  },
  handlers: {
    onPrefectureChanged: (v: React.ChangeEvent<HTMLInputElement>) => void;
    onPrefectureKeydown: (v: React.KeyboardEvent<HTMLInputElement>) => void;
    onPrefectureBlur: () => void;
    onPrefectureAutocompleteClicked: (v: string) => void;
  }
}

const AutocompleteLists = (props: { items: string[], cursor: number, onItemClicked: (v: string) => void }) => {
  if (props.items.length === 0) {
    return null;
  }

  return (
    <Box
      boxShadow={1}
      style={{position: 'absolute', width: '100%', top: 'calc(100% - 7px)', backgroundColor: 'white'}}
    >
      <List dense={true} disablePadding={true}>
        {props.items.map((v, index) =>
          <ListItem selected={index === props.cursor}>
            <ListItemText
              key={`${v}-${index}`}
              onClick={() => props.onItemClicked(v)}
            >
            {v}
            </ListItemText>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

const useOutsideClickDetect = (ref: React.MutableRefObject<HTMLInputElement|null>, cb: () => void) => {
  const eventHandler = (event: MouseEvent|FocusEvent) =>
    ref.current && !ref.current.contains(event.target as Node) && cb();

  useEffect(() => {
    document.addEventListener('focusin', eventHandler);
    document.addEventListener('mousedown', eventHandler);
    return () => {
      document.removeEventListener('focusin', eventHandler);
      document.removeEventListener('mousedown', eventHandler);
    }
  });
};

export default (props: Props) => {
  const wrapRef = useRef(null);
  useOutsideClickDetect(wrapRef, props.handlers.onPrefectureBlur);

  return (
    <FormControl fullWidth ref={wrapRef}>
      <TextField
        label="prefecture"
        placeholder='please input prefecture'
        value={props.data.prefecture}
        onChange={props.handlers.onPrefectureChanged}
        onKeyDown={props.handlers.onPrefectureKeydown}
        margin="normal"
      />
      <AutocompleteLists
        items={props.data.autocomplete.prefecture.items}
        cursor={props.data.autocomplete.prefecture.cursor}
        onItemClicked={props.handlers.onPrefectureAutocompleteClicked}
      />
    </FormControl>
  );
};
