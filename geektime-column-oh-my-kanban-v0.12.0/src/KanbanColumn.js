/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

const kanbanColumnStyles = css`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  border-radius: 1rem;

  & > h2 {
    margin: 0.6rem 1rem;
    padding-bottom: 0.6rem;
    border-bottom: 1px solid gray;

    & > button {
      float: right;
      margin-top: 0.2rem;
      padding: 0.2rem 0.5rem;
      border: 0;
      border-radius: 1rem;
      height: 1.8rem;
      line-height: 1rem;
      font-size: 1rem;
    }
  }

  & > ul {
    flex: 1;
    flex-basis: 0;
    margin: 1rem;
    padding: 0;
    overflow: auto;
  }
`;

export default function KanbanColumn({
  children, bgColor, title, setIsDragSource = () => {}, setIsDragTarget = () => {}, onDrop
}) {
  return (
    <section
      onDragStart={() => setIsDragSource(true)}
      onDragOver={(evt) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
        setIsDragTarget(true);
      } }
      onDragLeave={(evt) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'none';
        setIsDragTarget(false);
      } }
      onDrop={(evt) => {
        evt.preventDefault();
        onDrop && onDrop(evt);
      } }
      onDragEnd={(evt) => {
        evt.preventDefault();
        setIsDragSource(false);
        setIsDragTarget(false);
      } }
      css={css`
        ${kanbanColumnStyles}
        background-color: ${bgColor};
      `}
    >
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
}
