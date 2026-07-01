export const apiResponse = <T>(
  success: boolean,
  message: string,
  data: T | null,
  statusCode: number = 200
) => ({
  success,
  message,
  data,
  statusCode,
});
