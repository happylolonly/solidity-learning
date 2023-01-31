import hre from "hardhat";

async function getBalance(address) {
  const balance = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balance);
}

async function printBalances(addresses) {
  for (const address of addresses) {
    console.log(`${address}: ${await getBalance(address)}`);
  }
}

async function printMemos(memos) {
  for (const memo of memos) {
    const { timestamp, name, message, from } = memo;
    console.log(`${name} ${message} ${timestamp} ${from}`);
  }
}

async function main() {
  const [owner, tipper1, tipper2, tipper3] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractFactory("BuyMeACoffee");
  const contractDeployed = await contract.deploy();
  await contractDeployed.deployed();

  console.log("Contract deployed to:", contractDeployed.address);

  const addresses = [
    owner.address,
    tipper1.address,
    tipper2.address,
    tipper3.address,
  ];
  await printBalances(addresses);

  const tip = { value: hre.ethers.utils.parseEther("1.0") };

  await contractDeployed.connect(tipper1).buyCoffee("John1", "Thanks", tip);
  await contractDeployed.connect(tipper2).buyCoffee("John2", "Thanks", tip);
  await contractDeployed.connect(tipper3).buyCoffee("John3", "Thanks", tip);

  const memos = await contractDeployed.getMemos();

  printMemos(memos);
  await printBalances(addresses);
}

main();
