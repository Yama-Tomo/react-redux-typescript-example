import * as React from 'react';
import styled from 'styled-components';

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
    onPrefectureBlur: (v: React.FocusEvent<HTMLInputElement>) => void;
  }
}

const AutocompleteWrap = styled.div`
  width: 71%;
  background-color: white;
`;

const AutocompleteItems = styled.ul`
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: left;
  padding-left: 25px;
  color: #333;
  font-size: 14px;
`;

const AutocompleteItem = styled.li`
  background-color: ${(props: { active: boolean }) => props.active ? '#ddd' : 'white'}}
`;

const AutocompleteLists = (props: { items: string[], cursor: number }) => {
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
  width: 70%;
`;

export default (props: Props) => {
  return (
    <>
      <Input
        type="text"
        placeholder="prefecture"
        value={props.data.prefecture}
        onChange={props.handlers.onPrefectureChanged}
        onKeyDown={props.handlers.onPrefectureKeydown}
        onBlur={props.handlers.onPrefectureBlur}
      />
      <AutocompleteLists
        items={props.data.autocomplete.prefecture.items}
        cursor={props.data.autocomplete.prefecture.cursor}
      />
    </>
  );
};
