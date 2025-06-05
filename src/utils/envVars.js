import has from "just-has";

// Easy lookups for env vars
export const isEnvVarSet = (env, varName) => {
    return has(env, varName);
}

export const getEnvVar = (env, varName) => {
    if (isEnvVarSet(env, varName)) {
        return env[varName];
    }
    return null;
}