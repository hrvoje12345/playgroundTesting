import { ServerError } from '../errors/ServerError';
import { EnvVariable } from '../values/EnvVariable';

export const getEnv = (
  variableName: EnvVariable,
  isOptional = false,
): string => {
  const value = process.env[variableName];

  if (!value && !isOptional) {
    throw new ServerError(
      `The requested environment variable ${variableName} is empty`,
    );
  }

  return value || '';
};
