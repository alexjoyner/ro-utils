import React from 'react';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
import { Panel } from '../Panel';
import { CenteredContent } from '../CenteredContent';
import { Button } from '../Button';
import { zIndexes } from '../utils/zIndexes';

console.warn('Notification will be removed soon!');
const NotificationWrapper = styled.div`
    position: fixed;
    z-index: ${zIndexes.Notification};
    top: 40px;
    right: 15px;
    transition: all 0.5s ease;
    ${props => ((props.shown) ? `
        transform: translateX(0)
    ` : `
        transform: translateX(500%)
    `)}
`;


const Notification = ({ children, onClose, ...props }) => (
  <NotificationWrapper {...props}>
    <Panel width="300px">
      <CenteredContent>
        {children}
        <Button color="danger" size="small" onClick={onClose}>
          <IoMdClose />
        </Button>
      </CenteredContent>
    </Panel>
  </NotificationWrapper>
);

export { Notification };