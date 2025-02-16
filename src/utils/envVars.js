// Easy lookups for env vars
export const isEnvVarSet = (c, varName) => {
    return c.env[varName] !== "" && c.env[varName] !== undefined && c.env[varName] !== null;
}

export const getEnvVar = (c, varName) => {
    if (isEnvVarSet(c, varName)) {
        return c.env[varName];
    }
    return null;
}