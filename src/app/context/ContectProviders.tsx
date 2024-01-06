import React from 'react';
import { RoomsProvider } from './RoomsContext';
import { ArrivalProvider } from './ArrivalContext';
import { TaxiProvider } from './TaxiContext';
import { LocalizationMUIProvider } from './LocalizationMUIProvider';

interface ContectProvidersProps {
  children: React.ReactNode;
}

const ContextProviders: React.FC<ContectProvidersProps> = ({ children }) => {
  return (
    <RoomsProvider>
      <ArrivalProvider>
        <TaxiProvider>
          <LocalizationMUIProvider>
            {children}
          </LocalizationMUIProvider>
        </TaxiProvider>
      </ArrivalProvider>
    </RoomsProvider>
  );
}

export default ContextProviders;
