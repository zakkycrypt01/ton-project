import { toNano } from '@ton/core';
import { FactoryContract } from '../wrappers/FactoryContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const factoryContract = provider.open(await FactoryContract.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await factoryContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(factoryContract.address);

    console.log('ID', await factoryContract.getId());
}
