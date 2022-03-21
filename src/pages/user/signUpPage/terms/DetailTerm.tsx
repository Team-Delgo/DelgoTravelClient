import React, { DOMAttributes, UIEventHandler } from 'react';
import { useRef } from 'react';
import './DetailTerm.scss';
import term from './TermContents';

function DetailTerm(props: { id: number }) {
  const { id } = props;
  const scrollRef = useRef<HTMLDivElement>(null);
  const keyTyped = id as keyof typeof term;
  
  const scrollHandler = (event:any) => {
    console.log(scrollRef.current?.scrollTop);
  };

  return (
    <div className="wrapper" onScroll={scrollHandler} ref={scrollRef}>
      <p className="title">{term[keyTyped].main}</p>
      <p className="description">{term[keyTyped].description}</p>
    </div>
  );
}

export default DetailTerm;
