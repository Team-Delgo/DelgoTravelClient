import React from 'react';

interface Props {
  children: JSX.Element;
  callback: () => void;
}

function AnimationButton({ children, callback }: Props) {
  const onClickHanlder = () => {
    setTimeout(() => {
      callback();
    }, 200);
  };

  return (
    <div aria-hidden="true" onClick={onClickHanlder}>
      {children}
    </div>
  );
}

export default AnimationButton;
