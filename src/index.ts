import * as core from '@actions/core';

async function run() {
  try {
    const vars = [];
    console.log('ENV VARIABLES', process.env)
    core.info('ENV VARIABLES')
    core.info(process.env)
    core.exportVariable('LFMX', 'this is amazing!')
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run()
