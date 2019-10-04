import * as React from 'react';
import styled from 'styled-components';
import { useRef, useEffect } from 'react';

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

const AutocompleteWrap = styled.div`
  width: 100%;
  background-color: white;
`;

const AutocompleteItems = styled.ul`
  margin-top: 0px;
  margin-bottom: 0px;
  text-align: left;
  padding-left: 25px;
  color: #333;
  font-size: 14px;
`;

const AutocompleteItem = styled.li`
  background-color: ${(props: { active: boolean }) => props.active ? '#ddd' : 'white'}}
`;

const AutocompleteLists = (props: { items: string[], cursor: number, onItemClicked: (v: string) => void }) => {
  if (props.items.length === 0) {
    return null;
  }

  return (
    <AutocompleteWrap>
      <AutocompleteItems>
        {props.items.map((v, index) =>
          <AutocompleteItem
            key={`${v}-${index}`}
            active={index === props.cursor}
            onClick={() => props.onItemClicked(v)}
          >
          {v}
          </AutocompleteItem>
        )}
      </AutocompleteItems>
    </AutocompleteWrap>
  );
};

const Input = styled.input`
  font-size: 17px;
  width: 100%;
`;

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
    <div
      ref={wrapRef}
    >
      <Input
        type="text"
        placeholder="prefecture"
        value={props.data.prefecture}
        onChange={props.handlers.onPrefectureChanged}
        onKeyDown={props.handlers.onPrefectureKeydown}
      />
      <AutocompleteLists
        items={props.data.autocomplete.prefecture.items}
        cursor={props.data.autocomplete.prefecture.cursor}
        onItemClicked={props.handlers.onPrefectureAutocompleteClicked}
      />
    </div>
  );
};
