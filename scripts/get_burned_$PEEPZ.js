const { createPublicClient, http, parseAbiItem, formatEther } = require('viem');
const { baseMainnet } = require('viem/chains');

const ALCHEMY_API_KEY = '';
const ALCHEMY_BASE_URL = 'https://base-mainnet.g.alchemy.com';

// Initialize viem client
const client = createPublicClient({
  chain: baseMainnet,
  transport: http(`${ALCHEMY_BASE_URL}/v2/${ALCHEMY_API_KEY}`)
});

// Contract address for Peepz NFT
const PEEPZ_CONTRACT = '0x94c1ade1b99157b842341c640d9a8a86c9961ee0';

// Address representing burned tokens
const BURN_ADDRESS = '0x0000000000000000000000000000000000000000';

async function checkBurnedTokens() {
  try {
    console.log('Fetching transfer events to burn address...');
    
    // Get all transfer events to burn address
    const transferEvents = await client.getLogs({
      address: PEEPZ_CONTRACT,
      event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
      fromBlock: 0n,
      toBlock: 'latest',
      args: {
        to: BURN_ADDRESS
      }
    });

    // Sum up total amount burned
    let totalBurned = 0n;
    transferEvents.forEach(event => {
      const amount = BigInt(event.data);
      totalBurned += amount;
    });

    const formattedAmount = Number(formatEther(totalBurned)).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    console.log(`Total amount burned: ${formattedAmount} $PEEPZ`);
    console.log(`Number of burn transactions: ${transferEvents.length}`);

  } catch (error) {
    console.error('Error checking burned tokens:', error);
    throw error;
  }
}

// Run the check
checkBurnedTokens().catch(console.error);