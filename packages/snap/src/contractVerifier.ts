async function verifyContractAddress(address: string) {
    const data = await fetch(`https://api-goerli.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=RYCQBU5AY2GCN664H7RZB8GWS1UB1CZZRI`)
    const res = await data.json();
    return res;
}

export async function getContractDetails(transaction: any, chainId: string) {
     // Get tx data
     const contract_address =  transaction.to;
     const chain_id =  chainId.split(":")[1];
     const tx_hash = transaction.hash;
     const details = JSON.stringify({ "contract_address": contract_address, "tx_hash": tx_hash, "chain_id": chain_id});
 
     // Verify contract address
     const data = await verifyContractAddress(contract_address);
     const isVerified = data.result[0].SourceCode !== "";
     if(!isVerified) return { insights: {"Verification Status": `${contract_address} is not a verified source`, "Details": details},}
     else return { insights: {"Verification Status": `${contract_address} is a verified source`, "Contract Name": data.result[0].ContractName, "Details": details, "Contract Source Code": data.result[0].SourceCode },}
}
