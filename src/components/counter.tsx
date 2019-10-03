import * as React from 'react';

export interface Props {
  data: {
    currentVal: number;
  },
  handlers: {
    onIncrementClicked: () => void;
    onDecrementClicked: () => void;
  }
}

// NOTE: 無駄な再描画をしなくて済むようにボタンだけは別コンポーネントへ切り出す
const Buttons = React.memo((props: Props['handlers']) => {
  return (
    <>
      <button onClick={props.onIncrementClicked}>increment</button>
      <button onClick={props.onDecrementClicked}>decrement</button>
    </>
  );
});

export default (props: Props) => {
  return (
    <>
      <p>{props.data.currentVal}</p>
      <Buttons {...props.handlers} />
    </>
  );
};
