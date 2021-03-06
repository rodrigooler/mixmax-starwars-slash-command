import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { Resolver } from './src/Resolver';
import { constants } from './../_shared/Util/Constants';

const handler = async ({ queryStringParameters }) => {
  if (!queryStringParameters) {
    return constants.DEFAULT_RESPONSE_ENTER_SEARCH_TERM;
  }

  const text = queryStringParameters.text || queryStringParameters;
  const result = await Resolver.resolve(text);

  return result;
};

export const main: Handler = (
  event: APIGatewayEvent,
  context: Context,
  cb: Callback,
) => {
  console.log('**EVENT', event);

  handler(event)
    .then((result: any) => {
      const response = {
        ...constants.DEFAULT_RESPONSE,
        body: JSON.stringify(result),
      };
      console.log('**RESULT', response);

      return cb(null, response);
    })
    .catch((error: any) => {
      console.error('****ERROR', error);
      return cb(new Error('Something error happens :('));
    });
};
