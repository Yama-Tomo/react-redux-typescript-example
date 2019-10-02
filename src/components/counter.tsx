import * as React from 'react';
import { Props } from '../containers/counter';

// NOTE: 無駄な再描画をしなくて済むようにボタンだけは別コンポーネントへ切り出す
const Buttons = React.memo((props: Pick<Props, 'increment' | 'decrement'>) => {
  return (
    <>
      <button onClick={props.increment}>increment</button>
      <button onClick={props.decrement}>decrement</button>
    </>
  );
});

export default (props: Props) => {
  return (
    <>
      <p>{props.currentValue}</p>
      <Buttons increment={props.increment} decrement={props.decrement} />
    </>
  );
};
