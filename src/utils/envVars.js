// Easy lookups for env vars
export const isEnvVarSet = (env, varName) => {
    return env[varName] !== "" && env[varName] !== undefined && env[varName] !== null;
}

export const getEnvVar = (env, varName) => {
    if (isEnvVarSet(env, varName)) {
        return env[varName];
    }
    return null;
}