import { args } from './plugins/args.plugin';
import { ServerApp } from './presentation/server.app';

(async () => {
    await main();
})();

async function main() {
    const { b: base, l: limit, s: printTable, n: fileName, d: fileDestination } = args;
    ServerApp.run({ base, limit, printTable, fileName, fileDestination });
}
