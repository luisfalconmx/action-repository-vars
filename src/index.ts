import * as core from '@actions/core';

async function run() {
  try {
    core.exportVariable('LFMX', 'this is amazing!')
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run()
