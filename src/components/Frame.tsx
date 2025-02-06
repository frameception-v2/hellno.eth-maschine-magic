"use client";

import { useEffect, useCallback, useState } from "react";
import sdk, {
  AddFrame,
  SignIn as SignInCore,
  type Context,
} from "@farcaster/frame-sdk";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { useAccount, useBalance, useConnect } from "wagmi"; // Added useConnect

import { config } from "~/components/providers/WagmiProvider";
import { truncateAddress } from "~/lib/truncateAddress";
import { base, optimism } from "wagmi/chains";
import { useSession } from "next-auth/react";
import { createStore } from "mipd";
import { Label } from "~/components/ui/label";
import { PROJECT_TITLE } from "~/lib/constants";

function WalletDemoCard() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect(); // Added connect from useConnect hook
  const { data: balance, isLoading } = useBalance({
    address,
  });

  const [mockTxHash, setMockTxHash] = useState<string>();

  const handleMaschineAction = useCallback(() => {
    // Simulate a transaction hash
    setMockTxHash(`0x${Math.random().toString(16).slice(2)}`);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>🪄 Maschine Magic</CardTitle>
        <CardDescription>
          Experience next-gen wallet interactions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <div className="text-center">
            <p className="mb-4">Connect your wallet to begin</p>
            <Button onClick={() => connect({ connector: config.connectors[0] })}>
              Connect Wallet
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Label>Connected Wallet</Label>
              <div className="font-mono text-sm">
                {truncateAddress(address)}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Balance</Label>
              {isLoading ? (
                <Skeleton className="h-4 w-[100px]" />
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-mono">
                    {parseFloat(balance?.formatted || '0').toFixed(4)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {balance?.symbol}
                  </span>
                </div>
              )}
            </div>

            <Button 
              onClick={handleMaschineAction}
              variant="secondary"
            >
              Perform Maschine Magic
            </Button>

            {mockTxHash && (
              <div className="text-sm text-muted-foreground">
                TX: {truncateAddress(mockTxHash)}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Rest of the file remains unchanged...
