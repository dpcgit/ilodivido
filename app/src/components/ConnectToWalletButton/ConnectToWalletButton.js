import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from '@ethersproject/units'

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';



export default function ConnectButton() {
  const {activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
   activateBrowserWallet();
  }

  return account ? (
    <Box>
      <p>
      {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
      </p>
    </Box>
  ) : (
    <Button onClick={handleConnectWallet}>Connect to a wallet</Button>
  );
}
