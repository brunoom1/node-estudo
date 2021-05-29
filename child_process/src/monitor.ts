import path from 'path';
import { fork } from 'child_process';

const childFile = path.join(process.cwd(), process.argv[2]);
let child = fork(childFile);

process.stdin.on('data', data => {
    const command = data.toString('utf-8');

    if (command.indexOf('rs') !== -1) {
        if (child.kill('SIGKILL')) {
            child = fork(childFile);
            console.log("restart server");
        }
    }

    if (command.indexOf('quit') !== -1) {
        if (child.kill('SIGKILL')) {
            process.exit(0);
        }
    }
});


