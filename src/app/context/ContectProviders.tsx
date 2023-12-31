import React from 'react';
import { RoomsProvider } from './RoomsContext';
import { ArrivalProvider } from './ArrivalContext';
import { VipTaxiProvider } from './VipTaxiContext';

interface ContectProvidersProps {
  children: React.ReactNode;
}

const ContextProviders: React.FC<ContectProvidersProps> = ({ children }) => {
  return (
    <RoomsProvider>
      <ArrivalProvider>
        <VipTaxiProvider>
          {children}
        </VipTaxiProvider>
      </ArrivalProvider>
    </RoomsProvider>
  );
}

export default ContextProviders;
