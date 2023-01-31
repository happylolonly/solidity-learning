import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import dotenv from "dotenv";

dotenv.config();

const url = process.env.GOERLI_URL;
const privateKey = process.env.PRIVATE_KEY as string;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: url,
      accounts: [privateKey],
    },
  },
};

export default config;
