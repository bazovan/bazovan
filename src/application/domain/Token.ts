import {Constants} from '../../';

/**
 * Save and convert token to any
 * needed type ...
 */
export class Token {
  constructor(private _token: string) {}

  // Generates the sse url to use in our connection.
  public toSSE(): string {
    return Constants.SSE.uri.replace(/#token/i, this._token);
  }

  /**
   * Get the raw token.
   * @return {string}
   */
  public raw() {
    return this._token;
  }

  /**
   * Generate hash for token.
   * @return {string}
   */
  public hash(): string {
    return '';
  }
}
