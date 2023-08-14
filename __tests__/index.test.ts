import * as httpHeaders from '../src';

const { default: getHeaderDescription } = httpHeaders;

describe('HTTP Headers', () => {
  describe('#retrieveMarkdown', () => {
    it('should request source markdown from MDN', async () => {
      const markdown = await httpHeaders.retrieveMarkdown();
      expect(markdown).toContain('title: HTTP headers');
    });
  });

  describe('#searchHeaderDescription', () => {
    it.todo('should return an empty string if headerNode not found');

    it.todo('should return an empty string if description node has no value');

    it.todo('should return a description');
  });

  describe('#getHeaderDescription', () => {
    // it('should retrieve markdown if not already cached', async () => {
    //   await getHeaderDescription([]);
    //   expect(fetchMock).toHaveBeenCalledWith(sourceUrl);
    //   expect(fetchMock).toHaveBeenCalledTimes(1);
    // });

    // it('should return an empty object if something goes wrong', async () => {
    //   jest.spyOn(httpHeaders, 'retrieveMarkdown').mockRejectedValueOnce(new Error('Does not exist.'));
    //   const headers = 'Connection';
    //   const descriptions = await getHeaderDescription(headers);
    //   expect(descriptions).toStrictEqual({});
    // });

    it('should return a header description for a string arguement', async () => {
      const headers = 'Connection';
      const descriptions = await getHeaderDescription(headers);
      expect(descriptions).toStrictEqual({
        Connection: 'Controls whether the network connection stays open after the current transaction finishes.',
      });
    });

    it('should return header descriptions for an array of strings', async () => {
      const headers = ['authorization', 'accept', 'Content-Security-Policy', 'nel', 'ECT', 'Accept-Encoding'];
      const descriptions = await getHeaderDescription(headers);
      expect(descriptions).toStrictEqual({
        accept: 'Informs the server about the types of data that can be sent back.',
        'Accept-Encoding':
          'The encoding algorithm, usually a compression algorithm, that can be used on the resource sent back.',
        authorization: 'Contains the credentials to authenticate a user-agent with a server.',
        'Content-Security-Policy': 'Controls resources the user agent is allowed to load for a given page.',
        nel: 'Defines a mechanism that enables developers to declare a network error reporting policy.',
        ECT: 'The effective connection type ("network profile") that best matches the connection\'s latency and bandwidth. This is part of the Network Information API.',
      });
    });
  });
});
